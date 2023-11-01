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
import { useNavigate } from 'react-router-dom'
import useThemeClass from '@/utils/hooks/useThemeClass'

type Blog = {
    id: number;
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

const ActionColumn = ({ row }: { row: Blog }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/crm/blog/blog-new/${row.id}`)
    }

    const onDelete = () => {
        // dispatch(toggleDeleteConfirmation(true))
        // dispatch(setSelectedBlog(row.id))
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

    const tableData = {pageIndex: 1, pageSize: 10, sort: {order: '', key: ''}, query: '', total: 12}
    const data = [
        {
            id: 1,
            img: "/img/others/img-1.jpg",
            title: "Discovering Almaty - The Gem of Kazakhstan",
            param: "discovering-almaty-the-gem-of-kazakhstan",
            date: "Oct 10, 2023",
            delayAnimation: "100",
            details: `Welcome to Kazakhstan's thriving capital city of Almaty! Almaty is a city that skillfully combines modernism with the surrounding natural beauty. It is located in the foothills of the magnificent Trans-Ili Alatau mountains.
        
            Examining Contemporary Marvels
            
            Almaty is evidence of Kazakhstan's quick advancement. This metropolis is characterised by skyscrapers, malls, and a vibrant metropolitan environment. Take a stroll around Almaty's busy streets to experience the vibrant atmosphere of this international centre. Don't miss the expansive perspective of the city from Kok Tobe, where it unfolds in all its splendour.
            
            Embracing Nature's Blessings
        
            Explore the neighbouring mountains to get away from the bustle of the city. Skiing in the winter and hiking in the summer are both year-round sports available at the Shymbulak Ski Resort. For nature lovers, a trip to the Big Almaty Lake is a must because of its gorgeous blue waters.
        
            Cultural Odyssey:
        
            Visit the Central State Museum to learn more about Kazakhstan's rich cultural and historical legacy. Visit the Ascension Cathedral, a masterpiece of wood architecture. Of course, you should also enjoy the regional fare at Zelyony Bazaar, where the fusion of flavours and fragrances makes for a memorable dining experience.
        
            Every tourist to Almaty is enthralled by the city. There is something here for everyone, from its modern charm to its natural beauties.
            .`,
            description1: `Almaty, also called "The Gem of Kazakhstan", is a place with unmatched beauty and charm that is tucked away in the heart of Central Asia. This amazing city is a must-visit for any travel enthusiast, offering a mesmerising blend of natural marvels, rich history, and vibrant culture. You will be in complete amazement of Almaty's magnificent scenery, which includes the tranquil Big Almaty Lake and the spectacular Tien Shan Mountains. The city's landmarks and museums honour its historical foundation, which dates back to the Silk Road era. In addition, Almaty's distinctive culinary pleasures and kind, welcoming locals combine to make for an amazing trip. Almaty is the ideal destination if you're looking for somewhere that skillfully blends the grandeur of nature with a vibrant culture.`,
            description2: `Almaty's natural attractions and outdoor pursuits are where its beauty really comes to life. Situated in the breathtaking Ile-Alatau National Park, the Big Almaty Lake boasts pristine waters encircled by towering peaks. Hiking and skiing enthusiasts will find plenty of chances at the adjacent Shymbulak Ski Resort, which offers stunning views of the surrounding mountains. All types of people can find something to enjoy in Almaty's varied landscapes, be they thrill seekers or naturalists. The Medeu Skating Rink, the world's highest-altitude ice rink with year-round activities in the middle of the mountains, is one of the city's most famous attractions. You will also remember the breathtaking panoramic views of Almaty that you will see when you ride the cable car to Kok-Tobe Hill.`,
            description3: `Beyond its scenic surroundings, Almaty entices visitors with a diverse range of cultural activities and mouthwatering dining options. Visit the Kazakh State Academic Drama Theatre to get a taste of local culture, or head to the majestic Almaty Central Mosque for some peace and quiet. Kazakh cuisine is a tasty blend of Middle Eastern, Russian, and Central Asian flavours that will delight your taste buds. Don't pass up the opportunity to sample the delicious pilaf known as plov or the classic meat and pasta dish beshbarmak. Fresh produce, dried fruits, and other regional specialties can be sampled while touring the city's markets, like the lively Green Bazaar. Almaty offers more than simply breathtaking scenery; it also offers rich customs, artistic expressions, and delectable cuisine that enhance your journey. If Almaty is in your travel itinerary, you'll find an intriguing jewel just waiting to be discovered.`,
            tag: "Almaty",
            routePath: "/blog/blog-list/discovering-almaty-the-gem-of-kazakhstan"
          },
          {
            id: 2,
            img: "/img/others/img-1.jpg",
            title: "Tashkent Unveiled - Where Tradition Meets Modernity",
            param: "tashkent-unveiled-where-tradition-meets-modernity",
            date: "Sept 06, 2023",
            delayAnimation: "100",
            details: `Welcome to Tashkent, the capital of Uzbekistan, where a contemporary façade coexists peacefully with centuries-old customs.
        
            Journey Through History: Start your journey in the Hast-Imam Complex, a masterpiece of Islamic architecture that preserves historic Islamic texts, including the well-known Quran of Caliph Uthman. Explore the State Museum of History of Uzbekistan to learn about the history of the country over the centuries. An insight into the famous conqueror's life is provided through the Amir Timur Museum.
            
            Architectural Wonders: Be awed by the intricate beauty of Tashkent's constructions. A full-city panorama is available from the top of the Tashkent TV Tower. A beautiful example of mediaeval Islamic architecture is the Kukeldash Madrasah. Also, don't miss taking a trip around Amir Timur Square, which is dotted with memorials honouring Uzbekistan's past.
            Immerse Yourself in the Culture: The Chorsu Bazaar is a lively market where you can sample regional cuisine and shop for handicrafts representative of the local culture in Tashkent. A really wonderful event, Uzbek music and dance are performed in the Navoi Theatre.
        
            Tashkent extends a warm invitation to discover its fascinating past, enjoy its culture, and see how the old and new coexist in harmony.`,
            description1: `Welcome to Uzbekistan's capital city of Tashkent, where venerable customs coexist peacefully with the fast-paced modern world. Discover a city that masterfully merges the old and the new with "Tashkent Unveiled - Where Tradition Meets Modernity". The attraction of Tashkent is its capacity to welcome change while clinging to its rich historical legacy. Travellers are invited to observe this fascinating fusion of tradition and contemporary as this city is a powerful example of how they can coexist happily.`,
            description2: `Tashkent is a historical gem mine that provides a window into the city's long history. Discover Uzbekistan's rich history by touring the Old City, which is home to madrasas, mausoleums, and mosques dating back hundreds of years. In addition, Tashkent's contemporary skyline is made up of shining buildings, busy marketplaces, and a vibrant arts and culture scene. The city's lasting traditions are reflected in the thriving Chorsu Bazaar, which has stood for centuries, while its modern aspirations are symbolised by the Tashkent TV Tower, one of the tallest in the world. Tashkent's uniqueness is demonstrated by the way the old and the new coexist peacefully.`,
            description3: `There's no other gastronomic and cultural odyssey like Tashkent's. Savour the flavours of Uzbek food, which is known for its flavorful pilaf, tender kebabs, and elaborate sweets. The city's teahouses, like as the well-known Chaikhana in Tashkent, provide a genuine sense of Uzbek hospitality. In terms of culture, Tashkent has a thriving cultural scene, with galleries, museums, and theatres exhibiting the creative spirit of the country. The Navoi Opera and Ballet Theatre, which presents traditional Uzbek acts in a contemporary setting, is a true masterpiece. The contrasts of Tashkent will fascinate your senses and deepen your awareness of a city that skillfully combines tradition and modernity, whether you're enjoying a traditional meal or viewing contemporary art. Here in Tashkent, the past and present come together to offer a genuinely unforgettable vacation experience.`,
            tag: "Tashkent",
            routePath: "/blog/blog-details/tashkent-unveiled-where-tradition-meets-modernity"
          },
    ];
      
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
