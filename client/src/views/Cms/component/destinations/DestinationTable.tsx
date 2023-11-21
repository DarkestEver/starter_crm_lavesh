import type {
    ColumnDef,
    DataTableResetHandle,
    OnSortParam,
} from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { Notification, toast } from '@/components/ui'
import reducer, { deleteDestination, useAppDispatch, useAppSelector } from './store'
import { useEffect, useMemo, useRef } from 'react'

import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import { FiPackage } from 'react-icons/fi'
import { SLICE_NAME } from "./store/destinationSlice"
import cloneDeep from 'lodash/cloneDeep'
import { fetchDestinations } from './store'
import { injectReducer } from '@/store'
import { useNavigate } from 'react-router-dom'
import useThemeClass from '@/utils/hooks/useThemeClass'

injectReducer(SLICE_NAME, reducer)

type Destination = {
    _id: number;
    country: string,
    param: string,
    thumbnail: string,
    hoverText: string,
    slideImg: {
        id: string
        name: string
        img: string
    }[],
    description: string,
    properties: string,
    timeZone: string,
    timeBehind: string,
    currency: string,
    exchange: string,
    bestTimeToVisit: string,
    city: {
        img: string;
        cityName: string;
        routePath: string;
    }[];
}

const ActionColumn = ({ row }: { row: Destination }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const onEdit = () => {
        navigate(`/cms/destinations/edit/${row._id}`)
    }

    const onDelete = () => {
        dispatch(deleteDestination(row._id))
        toast.push(<Notification title={'Successfully deleted destination.'} type="success" />, {
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

const DestinationColumn = ({ row }: { row: Destination }) => {
    const avatar = row.img ? (
        <Avatar src={row.img} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.country}</span>
        </div>
    )
}

const DestinationTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch();
    
    const { destinationData : data, loading } = useAppSelector(state => state.destination.data);

    useEffect(()=> {
        dispatch(fetchDestinations())
    },[data])

    const tableData = {pageIndex: 1, pageSize: 10, sort: {order: '', key: ''}, query: '', total: 12}
      
    const columns: ColumnDef<Destination>[] = useMemo(
        () => [
            {
                header: 'Country',
                accessorKey: 'country',
                cell: (props) => {
                    const row = props.row.original
                    return <DestinationColumn row={row} />
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
                    return <span className="">{row.description}</span>
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
        </>
    )
}

export default DestinationTable
