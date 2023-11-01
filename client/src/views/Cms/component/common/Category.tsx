import Card from '@/components/ui/Card'
import type { Category } from '../../store'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'


const CategoryIcon = ({ type }: { type: string }) => {
    const iconTypeProps = useMemo(() => {
        return {
            src: `/img/thumbs/${type}.png`,
            darkModeSrc: `/img/thumbs/help-center-category-${type}-dark.png`,
        }
    }, [type])

    return <DoubleSidedImage {...iconTypeProps} alt="" className='w-32 h-32' />
}

const Category = () => {
    const data = [
        {id: "1",name: "Home", thumb: 'home'},
        {id: "2",name: "About", thumb: 'about'},
        {id: "3",name: "Contact", thumb: 'contact'},
        {id: "4",name: "Destinations", thumb: 'destinations'},
        {id: "5",name: "Hotels", thumb: 'hotels'},
        {id: "6",name: "Footer", thumb: 'footer'},
        {id: "7",name: "Testimonials", thumb: 'testimonials'},
        {id: "8",name: "Blogs", thumb: 'blogs'},
        {id: "9",name: "Extras", thumb: 'extras'},
        // {id: "10",name: "Team"},
        // {id: "2",name: "Main Menu", thumb: 'main-menu'},
    ]

    return (
        <div className="grid lg:grid-cols-4 2xl:grid-cols-4 gap-4">
            {data.map((cat) => (
                <Card
                    key={cat.id}
                    clickable
                >
                    <Link to={`/cms/${cat.name.toLowerCase().replace(/ /g, '-')}`} >
                        <div className="mb-4 flex justify-center">
                            <CategoryIcon type={cat.thumb} />
                        </div>
                        <div className="text-center">
                            <h5 className="mb-1">{cat.name}</h5>
                        </div>
                    </Link>
                </Card>
            ))}
        </div>
    )
}

export default Category
