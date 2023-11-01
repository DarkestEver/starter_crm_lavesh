import AdaptableCard from '@/components/shared/AdaptableCard'
import HotelTable from './HotelTable'
import HotelTableTools from './HotelTableTools'
import { injectReducer } from '@/store'
import reducer from '../../store'

injectReducer('salesDestinationList', reducer)

const HotelList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Destinations</h3>
                <HotelTableTools />
            </div>
            <HotelTable />
        </AdaptableCard>
    )
}

export default HotelList
