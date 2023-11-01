import { HiDownload, HiPlusCircle } from 'react-icons/hi'

import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'

// import ProductTableSearch from './ProductTableSearch'
// import ProductFilter from './ProductFilter'


const HotelTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            {/* <ProductTableSearch />
            <ProductFilter /> */}
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/cms/Hotels/edit"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Hotel
                </Button>
            </Link>
        </div>
    )
}

export default HotelTableTools
