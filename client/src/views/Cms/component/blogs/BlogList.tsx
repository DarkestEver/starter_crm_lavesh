import AdaptableCard from '@/components/shared/AdaptableCard'
import BlogTable from './BlogTable'
import BlogTableTools from './BlogTableTools'
import { injectReducer } from '@/store'
import reducer from '../../store'

injectReducer('salesDestinationList', reducer)

const BlogList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Destinations</h3>
                <BlogTableTools />
            </div>
            <BlogTable />
        </AdaptableCard>
    )
}

export default BlogList
