import type { ColumnDef, DataTableResetHandle, OnSortParam } from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import reducer, { fetchAllBlogs, useAppDispatch, useAppSelector } from './store'
import { useMemo, useRef } from 'react'

import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import { FiPackage } from 'react-icons/fi'
import { SLICE_NAME, deleteBlog } from './store/blogSlice'
import cloneDeep from 'lodash/cloneDeep'
import { injectReducer } from '@/store'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { Notification, toast } from '@/components/ui'

injectReducer(SLICE_NAME, reducer)

type Blog = {
    _id: number;
    img: string;
    title: string;
    param: string;
    date: string;
    delayAnimation: string;
    details: string;
    description1: string;
    description2: string;
    description3: string;
    tag: string;
    routePath: string;
}

const ActionColumn = ({ row }: { row: Blog }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const onEdit = () => {
        navigate(`/cms/blogs/edit/${row._id}`)
    }

    const onDelete = () => {
        dispatch(deleteBlog(row._id))
        toast.push(<Notification title={'Successfully deleted Blog.'} type="success" />, {
            placement: 'top-center',
        })
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const BlogColumn = ({ row }: { row: Blog }) => {
    const avatar = row.img ? (
        <Avatar src={row.img} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.title}</span>
        </div>
    )
}

const BlogTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch();

    const { blogData: data, loading } = useAppSelector( (state) => state.blog.data)
    
    useEffect(() => {
        dispatch(fetchAllBlogs())
    },[data])    

    const tableData = {pageIndex: 1, pageSize: 10, sort: {order: '', key: ''}, query: '', total: 12}
      
    const columns: ColumnDef<Blog>[] = useMemo(
        () => [
            {
                header: 'Title',
                accessorKey: 'Title',
                cell: (props) => {
                    const row = props.row.original
                    return <BlogColumn row={row} />
                },
            },
            {
                header: 'Slug',
                // accessorKey: 'param',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="">/{row.param}</span>
                },
            },
            {
                header: 'Date',
                // accessorKey: 'date',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="">{row.date}</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        // dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        // dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        // dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                // loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            {/* <BlogDeleteConfirmation /> */}
        </>
    )
}

export default BlogTable
