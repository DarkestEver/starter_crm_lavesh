import type {
    ColumnDef,
    DataTableResetHandle,
    OnSortParam,
} from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { Notification, toast } from '@/components/ui'
import reducer, { deleteTestimonial, fetchTestimonials, useAppDispatch, useAppSelector } from './store'
import { useEffect, useMemo, useRef } from 'react'

import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import { FiPackage } from 'react-icons/fi'
import { SLICE_NAME } from './store/testimonialSlice'
import cloneDeep from 'lodash/cloneDeep'
import { injectReducer } from '@/store'
import { useNavigate } from 'react-router-dom'
import useThemeClass from '@/utils/hooks/useThemeClass'

injectReducer(SLICE_NAME, reducer)

// import DestinationDeleteConfirmation from './DestinationDeleteConfirmation'

type Testimonial = {
    _id: string;
    avatar: string;
    name: string;
    designation: string;
    text: string;
    delayAnimation: string;
}

const ActionColumn = ({ row }: { row: Testimonial }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/cms/testimonials/edit/${row._id}`)
    }

    const onDelete = () => {
        dispatch(deleteTestimonial(row._id))
        toast.push(<Notification title={'Successfully deleted testimonial.'} type="success" />, {
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

const TestimonialColumn = ({ row }: { row: Testimonial }) => {
    const avatar = row.avatar ? (
        <Avatar src={row.avatar} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const TestimonialTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch();
    const { testimonialData: data , loading} = useAppSelector( (state) => state.testimonial.data)
    useEffect(() => {
        dispatch(fetchTestimonials())
    },[data])

    const tableData = {pageIndex: 1, pageSize: 10, sort: {order: '', key: ''}, query: '', total: 12}

    const columns: ColumnDef<Testimonial>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <TestimonialColumn row={row} />
                },
            },
            {
                header: 'Designation',
                // accessorKey: 'designation',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="">{row.designation}</span>
                },
            },
            {
                header: 'Delay Animation',
                // accessorKey: 'delay-animation',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="">{row.delayAnimation}</span>
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
            {/* <DestinationDeleteConfirmation /> */}
        </>
    )
}

export default TestimonialTable
