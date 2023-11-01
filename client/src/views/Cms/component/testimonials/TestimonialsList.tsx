import AdaptableCard from '@/components/shared/AdaptableCard'
import TestimonialTable from './TestimonialTable'
import TestimonialTableTool from './TestimonialTableTool'
import { injectReducer } from '@/store'
import reducer from '../../store'

// injectReducer('salesTestimonialList', reducer)

const TestimonialList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Testimonials</h3>
                <TestimonialTableTool />
            </div>
            <TestimonialTable />
        </AdaptableCard>
    )
}

export default TestimonialList
