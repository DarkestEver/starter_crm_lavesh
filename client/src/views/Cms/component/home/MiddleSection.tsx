import * as Yup from 'yup'

import { FcPlus, FcTreeStructure } from 'react-icons/fc'
import { Field, FieldArray, Form, Formik } from 'formik'
import type { FieldInputProps, FormikProps } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import { HiOutlineGlobeAlt, HiOutlineMinusCircle, HiOutlineUserCircle } from 'react-icons/hi'

import Button from '@/components/ui/Button'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import { Switcher } from '@/components/ui'
import toast from '@/components/ui/toast'

export type HomeFormModel = {
    popularDestination: PageSection;
    recommendedHotels: PageSection;
    blogs: PageSection;
    destinationsStats: PageSection;
    blockGuide: Boolean;
}

type PageSection = {
    heading: string;
    subHeading: string;
};

type props = {
    data?: HomeFormModel
}

const validationSchema = Yup.object().shape({
    popularDestination: Yup.object().shape({
      heading: Yup.string().required('Heading is required'),
      subHeading: Yup.string().required('Subheading is required'),
    }),
  
    recommendedHotels: Yup.object().shape({
      heading: Yup.string().required('Heading is required'),
      subHeading: Yup.string().required('Subheading is required'),
    }),
  
    blogs: Yup.object().shape({
      heading: Yup.string().required('Heading is required'),
      subHeading: Yup.string().required('Subheading is required'),
    }),
  
    destinationsStats: Yup.object().shape({
      heading: Yup.string().required('Heading is required'),
      subHeading: Yup.string().required('Subheading is required'),
    }),

    blockGuide: Yup.boolean(),
  });


const MiddleSection = ({
    data = {
        popularDestination: {
            heading: "",
            subHeading: ""
        },
        recommendedHotels: {
            heading: "",
            subHeading: ""
        },
        blogs: {
            heading: "",
            subHeading: ""
        },
        destinationsStats: {
            heading: "",
            subHeading: ""
        },
        blockGuide: true
    }    
}: props) => {
    const onSetFormFile = (
        form: FormikProps<HomeFormModel>,
        field: FieldInputProps<HomeFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (
        values: HomeFormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'Middle Section updated'} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false)
    }


    return (
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title="Home Page"
                                desc="Basic info for your home page"
                            />
                           
                           <FormRow name="popularDestination" label="Popular Destination" {...validatorProps}>
                                <Field type="text" name="popularDestination.heading" placeholder="Popular Destinations" component={Input} className="mb-2" />
                                <Field type="text" name="popularDestination.subHeading" placeholder="These popular destinations have a lot to offer" component={Input} />
                            </FormRow>

                            <FormRow name="recommendedHotels" label="Recommended Hotels" {...validatorProps}>
                                <Field type="text" name="recommendedHotels.heading" placeholder="Recommended Hotels" component={Input} className="mb-2" />
                                <Field type="text" name="recommendedHotels.subHeading" placeholder="Discover Our Handpicked Collection of Exceptional Hotels - Your Ideal Stay Awaits!" component={Input} />
                            </FormRow>

                            <FormRow name="blogs" label="Blogs" {...validatorProps}>
                                <Field type="text" name="blogs.heading" placeholder="Get inspiration for your next trip" component={Input} className="mb-2" />
                                <Field type="text" name="blogs.subHeading" placeholder="Explore Travel Blogs for Ultimate Adventure Inspiration" component={Input} />
                            </FormRow>

                            <FormRow name="destinationsStats" label="Destinations Stats" {...validatorProps}>
                                <Field type="text" name="destinationsStats.heading" placeholder="Destinations we love" component={Input} className="mb-2" />
                                <Field type="text" name="destinationsStats.subHeading" placeholder="Embark on a Journey to Our Beloved Destinations" component={Input} />
                            </FormRow>
                            <FormRow name="blockGuide" label="Block Guide" {...validatorProps}>
                                <Field name="blockGuide" component={Switcher} />
                            </FormRow>

                            
                            <div className="mt-4 ltr:text-right">
                                <Button
                                    className="ltr:mr-2 rtl:ml-2"
                                    type="button"
                                    onClick={() => resetForm()}
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting ? 'Updating' : 'Save'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}


export default MiddleSection