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

type Destination = {
    id: number;
    hoverText: string;
    param: string;
    country: string;
    slideImg: string[];
    img: string;
    description: string;
    timeZone: string;
    timeBehind: string;
    currency: string;
    exchange: string;
    bestTimeToVisit: string;
}

const ActionColumn = ({ row }: { row: Destination }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/crm/destination/destination-new/${row.id}`)
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

    const tableData = {pageIndex: 1, pageSize: 10, sort: {order: '', key: ''}, query: '', total: 12}
    const data = [
        {
            id: 1,
            hoverText: "11 Hotel - 18 Tours - 85 Activity",
            param: "turkey",
            country: "Turkey",
            slideImg: [
              "/img/destinations/turkey/1.jpg",
              "/img/destinations/turkey/2.jpg",
              "/img/destinations/turkey/3.jpg",
              "/img/destinations/turkey/4.jpg",
              "/img/destinations/turkey/5.jpg",
            ],
            img: "/img/countries/cn.png",
            description: "Begin your odyssey in Turkey, a land where the East meets the West, and ancient history intertwines with modern allure. Explore Istanbul's iconic Hagia Sophia and Blue Mosque, stand in awe of the otherworldly landscapes in Cappadocia, and unwind on the pristine beaches of Antalya. Don't miss the historic ruins of Ephesus or the natural wonders of Pamukkale. Delight your taste buds with exquisite Turkish cuisine and lose yourself in the vibrant tapestry of Turkish culture.",
            timeZone: "GMT +03:00",
            timeBehind: "1 hour ahead",
            currency: "Turkish Lira",
            exchange: "1 INR = 0.011TRY",
            bestTimeToVisit: "JUN",
            city: [ 
              { img: "/img/destinations/city/istanbul/istanbul-bg.jpg" , cityName: "Istanbul", routePath: "/destination/istanbul" },
              { img: "/img/destinations/city/cappadocia/cappadocia-bg.jpg" , cityName: "Cappadocia", routePath: "/destination/cappadocia" },
              { img: "/img/destinations/city/antalya/antalya-bg.jpg" , cityName: "Antayla", routePath: "/destination/antalya" },
            ],
          },
          {
            id: 2,
            hoverText: "13 Hotel - 10 Tours - 70 Activity",
            param: "russia",
            country: "Russia",
            slideImg: [
              "/img/destinations/russia/1.jpg",
              "/img/destinations/russia/2.jpg",
              "/img/destinations/russia/3.jpg",
              "/img/destinations/russia/4.jpg",
              "/img/destinations/russia/5.jpg",
            ],
            img: "/img/countries/us.png",
            description: "The world's largest nation, Russia, is a frontier ripe for exploration. Immerse yourself in the cultural diversity of St. Petersburg's Hermitage Museum and the imperial splendour of Moscow's Red Square. Get a view of Russia's enormous landscapes, from the Ural Mountains to Siberia's freezing tundra, by travelling on the storied Trans-Siberian Railway. Enjoy the kind welcome of the locals while dining on borscht and blini, two classic meals.",
            timeZone: "GMT +03:00",
            timeBehind: "1 hour ahead",
            currency: "Russian Ruble",
            exchange: "1 INR = 0.98RUB",
            bestTimeToVisit: "JUL",
          },
    ];
      
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
            {/* <DestinationDeleteConfirmation /> */}
        </>
    )
}

export default DestinationTable
