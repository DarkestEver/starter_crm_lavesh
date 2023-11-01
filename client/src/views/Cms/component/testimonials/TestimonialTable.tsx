import type {
    ColumnDef,
    DataTableResetHandle,
    OnSortParam,
} from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useMemo, useRef } from 'react'

import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import { FiPackage } from 'react-icons/fi'
import cloneDeep from 'lodash/cloneDeep'
import {
    useAppDispatch,
} from '../../store'
import { useNavigate } from 'react-router-dom'
import useThemeClass from '@/utils/hooks/useThemeClass'

// import DestinationDeleteConfirmation from './DestinationDeleteConfirmation'

type Testimonial = {
    id: string;
    avatar: string;
    name: string;
    designation: string;
    text: string;
    delayAnimation: string;
}

const inventoryStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: {
        label: 'In Stock',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Limited',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: {
        label: 'Out of Stock',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const ActionColumn = ({ row }: { row: Testimonial }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/crm/testimonials/testimonial-new`)
    }

    const onDelete = () => {
        // dispatch(toggleDeleteConfirmation(true))
        // dispatch(setSelectedDestination(row.id))
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

    const tableData = {pageIndex: 1, pageSize: 10, sort: {order: '', key: ''}, query: '', total: 12}
    const data = [
        {
            id: 1,
            avatar: "/img/avatars/thumb-1.jpg",
            name: "Rahul Singh",
            designation: "Travel Enthusiast",
            text: `My journey with Eurasia through Turkey was an unforgettable experience. From the bustling markets of Istanbul to the surreal landscapes of Cappadocia, every moment was a discovery. The personalized itinerary crafted by Eurasia made me fall in love with Turkish culture and history.`,
            delayAnimation: "100",
          },
          {
            id: 2,
            avatar: "/img/avatars/thumb-2.jpg",
            name: "Aman Dutt",
            designation: "Adventurer",
            text: `Russia, a land of mystery and wonder. Thanks to Eurasia, I explored the iconic Red Square in Moscow, wandered through the art-filled streets of St. Petersburg, and even ventured into the serene beauty of Siberia. Eurasia's attention to detail ensured a seamless and enriching experience.`,
            delayAnimation: "200",
          },
    ];
      
      

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
