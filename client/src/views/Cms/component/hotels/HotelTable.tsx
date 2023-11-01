import type {
    ColumnDef,
    DataTableResetHandle,
    OnSortParam,
} from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useAppDispatch } from '../../store'
import { useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import { FiPackage } from 'react-icons/fi'
import cloneDeep from 'lodash/cloneDeep'
import { useNavigate } from 'react-router-dom'
import useThemeClass from '@/utils/hooks/useThemeClass'

type Hotel = {
    id: number;
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

    const onEdit = () => {
        navigate(`/crm/Hotel/Hotel-new/${row.id}`)
    }

    const onDelete = () => {
        // dispatch(toggleDeleteConfirmation(true))
        // dispatch(setSelectedHotel(row.id))
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

    const tableData = {pageIndex: 1, pageSize: 10, sort: {order: '', key: ''}, query: '', total: 12}
    const data = [
        {
            id: 1,
            tag: "Breakfast Included",
            slideImg: ["/img/hotels/metropolitan-taksim-hotel/1.jpg","/img/hotels/metropolitan-taksim-hotel/2.jpg","/img/hotels/metropolitan-taksim-hotel/3.jpg","/img/hotels/metropolitan-taksim-hotel/4.jpg","/img/hotels/metropolitan-taksim-hotel/5.jpg","/img/hotels/metropolitan-taksim-hotel/6.jpg","/img/hotels/metropolitan-taksim-hotel/7.jpg","/img/hotels/metropolitan-taksim-hotel/8.jpg"],
            img: "/img/hotels/1.jpg",
            param: "metropolitan-taksim-hotel",
            title: "Metropolitan Taksim Hotel",
            btnHref: "https://www.makemytrip.com/hotels-international/turkey/istanbul-hotels/metropolitan_hotels_taksim-details.html",
            overview: "The Metropolitan Taksim Hotel, located in the centre of Istanbul, entices with its 4.7-star magnificence. The hotel has 3014 reviews and is well-known for its complimentary breakfast and first-rate service. It provides visitors with a haven of elegance with a hint of grandeur, complete with contemporary conveniences and roomy accommodations. Enjoy the city's breathtaking sights while getting to know Istanbul's vibrant culture. Due to its convenient proximity to the city's exciting attractions, the hotel is a favourite among discerning tourists.",
            location: "Istanbul",
            ratings: "4.7",
            numberOfReviews: "3014",
            delayAnimation: "100",
            routePath: "/hotel/metropolitan-taksim-hotel"
          },
          {
            id: 2,
            tag: "",
            slideImg: ["/img/hotels/marmara-taksim/1.jpg", "/img/hotels/marmara-taksim/2.jpg", "/img/hotels/marmara-taksim/3.jpg","/img/hotels/marmara-taksim/4.jpg","/img/hotels/marmara-taksim/5.jpg","/img/hotels/marmara-taksim/6.jpg","/img/hotels/marmara-taksim/7.jpg"],
            img: "/img/hotels/2.jpg",
            param: "marmara-taksim",
            title: "Marmara Taksim",
            btnHref: "https://www.makemytrip.com/hotels-international/turkey/istanbul-hotels/the_marmara_taksim_6608967321240337-details.html",
            overview: "Istanbul's humming urban landscape is graced by the 4.8-star masterpiece Marmara Taksim. Customers gush about the hotel's lavish amenities and magnificent vistas in its impressive 2345 reviews. It offers a luxurious refuge to both pleasure and business travellers and is well located in the centre of the city. Each room's combination of modernity and comfort ensures a memorable stay. As the hotel places you in the centre of the action, discover Istanbul's beauties with ease.",
            location: "Istanbul",
            ratings: "4.8",
            numberOfReviews: "2345",
            delayAnimation: "200",
            routePath: "/hotel/marmara-taksim"
          },
    ];
      
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
