import Button from '@/components/ui/Button'
import { HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const TestimonialTableTool = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/cms/testimonials/save"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Testimonial
                </Button>
            </Link>
        </div>
    )
}

export default TestimonialTableTool
