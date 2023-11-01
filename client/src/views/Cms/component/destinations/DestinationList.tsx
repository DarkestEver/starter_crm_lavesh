import AdaptableCard from '@/components/shared/AdaptableCard'
import DestinationTable from './DestinationTable'
import DestinationTableTools from './DestinationTableTools'
import { injectReducer } from '@/store'
import reducer from '../../store'

injectReducer('salesDestinationList', reducer)

const DestinationList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Destinations</h3>
                <DestinationTableTools />
            </div>
            <DestinationTable />
        </AdaptableCard>
    )
}

export default DestinationList
