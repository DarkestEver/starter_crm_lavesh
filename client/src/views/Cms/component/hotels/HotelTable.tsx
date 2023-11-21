import type {
    ColumnDef,
    DataTableResetHandle,
    OnSortParam,
} from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import reducer, { fetchHotels, useAppDispatch, useAppSelector } from './store'
import { useEffect, useMemo, useRef } from 'react'

import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import { FiPackage } from 'react-icons/fi'
import { SLICE_NAME, deleteHotel } from "./store/hotelSlice"
import cloneDeep from 'lodash/cloneDeep'
import { injectReducer } from '@/store'
import { useNavigate } from 'react-router-dom'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { Notification, toast } from '@/components/ui'

injectReducer(SLICE_NAME,reducer)

type Hotel = {
    _id: number;
    tag: string;
    slideImg: string[];
    img: string;
    param: string;
    title: string;
    btnHref: string;
    overview: string;
    location: string;
    ratings: string;
    numberOfReviews: string;
    delayAnimation: string;
    routePath: string;
}

const ActionColumn = ({ row }: { row: Hotel }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const onEdit = () => {
        navigate(`/cms/hotels/edit/${row._id}`)
    }

    const onDelete = () => {
        dispatch(deleteHotel(row._id))
        toast.push(<Notification title={'Successfully deleted Hotel.'} type="success" />, {
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

const HotelColumn = ({ row }: { row: Hotel }) => {
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

const HotelTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch();

    const { hotelData: data, loading } = useAppSelector( (state) => state.hotel.data)
    
    useEffect(() => {
        dispatch(fetchHotels())
    },[data])
    
    const tableData = {pageIndex: 1, pageSize: 10, sort: {order: '', key: ''}, query: '', total: 12}
      
    const columns: ColumnDef<Hotel>[] = useMemo(
        () => [
            {
                header: 'Title',
                accessorKey: 'title',
                cell: (props) => {
                    const row = props.row.original
                    return <HotelColumn row={row} />
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
                header: 'Description',
                // accessorKey: 'description',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="">{row.overview}</span>
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
            {/* <HotelDeleteConfirmation /> */}
        </>
    )
}

export default HotelTable
