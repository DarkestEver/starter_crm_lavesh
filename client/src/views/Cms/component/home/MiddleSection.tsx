import * as Yup from 'yup'

import { FcRules, FcTimeline } from 'react-icons/fc'
import { Field, Form, Formik } from 'formik'
import { editMiddleSection, fetchHome, useAppDispatch } from './store'
import { AdaptableCard } from '@/components/shared'
import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import { Switcher } from '@/components/ui'
import toast from '@/components/ui/toast'

export type MiddleSectionForm = {
    _id?: string;
    popularDestinationHeading: string;
    popularDestinationSubHeading: string;
    recommendedHotelsHeading: string;
    recommendedHotelsSubHeading: string;
    blogsHeading: string;
    blogsSubHeading: string;
    destinationsStatsHeading: string;
    destinationsStatsSubHeading: string;
    blockGuide: Boolean;
}

type props = {
    data?: MiddleSectionForm,
    homeId?: string,
}

const validationSchema = Yup.object().shape({
    popularDestinationHeading: Yup.string().required('Popular Destination Heading is required'),
    popularDestinationSubHeading: Yup.string().required('Popular Destination Subheading is required'),
    recommendedHotelsHeading: Yup.string().required('Recommended Hotels Heading is required'),
    recommendedHotelsSubHeading: Yup.string().required('Recommended Hotels Subheading is required'),
    blogsHeading: Yup.string().required('Blogs Heading is required'),
    blogsSubHeading: Yup.string().required('Blogs Subheading is required'),
    destinationsStatsHeading: Yup.string().required('Destinations Stats Heading is required'),
    destinationsStatsSubHeading: Yup.string().required('Destinations Stats Subheading is required'),
    blockGuide: Yup.boolean().required('Block Guide is required'),
  });

const MiddleSection = ({ data, homeId }: props) => {
    const initialData = {
        popularDestinationHeading: data?.popularDestinationHeading,
        popularDestinationSubHeading: data?.popularDestinationSubHeading,
        recommendedHotelsHeading: data?.recommendedHotelsHeading,
        recommendedHotelsSubHeading: data?.recommendedHotelsSubHeading,
        blogsHeading: data?.blogsHeading,
        blogsSubHeading: data?.blogsSubHeading,
        destinationsStatsHeading: data?.destinationsStatsHeading,
        destinationsStatsSubHeading: data?.destinationsStatsSubHeading,
        blockGuide: data?.blockGuide,
    }    
    const dispatch = useAppDispatch();

    const onFormSubmit = async (
        values: MiddleSectionForm,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try {
            setSubmitting(true);
            const response = await dispatch(editMiddleSection({ id: homeId , values: values }));
            if(response.meta.requestStatus == 'fulfilled'){
                dispatch(fetchHome())
                toast.push(<Notification title={'Middle Section updated'} type="success" />, {
                    placement: 'top-center',
                })
            }
        } catch (error) {
            console.error("Error posting MiddleSection:", error);
            toast.push(<Notification title={'Error please try  again later.'} type="danger" />, {
                placement: 'top-center',
            })
        }
        setSubmitting(false)
    }


    return (
        <AdaptableCard>
        <div className="max-w-[800px] mx-auto">
            
        <Formik
            enableReinitialize
            initialValues={initialData}
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
                                title="Popular Destinaiton"
                                desc="Basic info for your home page"
                            />
                           
                           <FormRow name="popularDestinationHeading" label="Heading" {...validatorProps} border={false}>
                                <Field type="text" name="popularDestinationHeading" placeholder="Popular Destinations" 
                                    component={Input} className="mb-2" 
                                    prefix={
                                        <FcRules className="text-xl" />
                                    }
                                />
                            </FormRow>
                                
                           <FormRow name="popularDestinationSubHeading" label="Sub Heading" {...validatorProps}>
                                <Field 
                                    type="text" name="popularDestinationSubHeading" placeholder="These popular destinations have a lot to offer" component={Input} 
                                    prefix={
                                        <FcTimeline className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormDesription
                                title="Recommended Hotels"
                                desc="Basic info for your home page"
                                className='mt-3'
                            />
                            <FormRow name="recommendedHotelsHeading" label="Heading" {...validatorProps} border={false}>
                            <Field
                                type="text"
                                name="recommendedHotelsHeading"
                                placeholder="Recommended Hotels"
                                component={Input}
                                className="mb-2"
                                prefix={
                                    <FcRules className="text-xl" />
                                }
                            />
                            </FormRow>
                            <FormRow name="recommendedHotelsSubHeading" label="Sub Heading" {...validatorProps}>
                            <Field
                                type="text"
                                name="recommendedHotelsSubHeading"
                                placeholder="Stay at the best hotels"
                                component={Input}
                                prefix={
                                    <FcTimeline className="text-xl" />
                                }
                            />
                            </FormRow>

                            <FormDesription
                                title="Blogs"
                                desc="Basic info for your home page"
                                className='mt-3'
                            />

                            <FormRow name="blogsHeading" label="Heading" {...validatorProps} border={false}>
                            <Field
                                type="text"
                                name="blogsHeading"
                                placeholder="Latest Travel Blogs"
                                component={Input}
                                className="mb-2"
                                prefix={
                                    <FcRules className="text-xl" />
                                }
                            />
                            </FormRow>

                            <FormRow name="blogsSubHeading" label="Sub Heading" {...validatorProps}>
                            <Field
                                type="text"
                                name="blogsSubHeading"
                                placeholder="Read interesting travel stories"
                                component={Input}
                                prefix={
                                    <FcTimeline className="text-xl" />
                                }
                            />
                            </FormRow>

                            <FormDesription
                            title="Destination Stats"
                            desc="Basic info for your home page"
                            className='mt-3'
                            />

                            <FormRow name="destinationsStatsHeading" label="Heading" {...validatorProps} border={false}>
                            <Field
                                type="text"
                                name="destinationsStatsHeading"
                                placeholder="Destination Stats"
                                component={Input}
                                className="mb-2"
                                prefix={
                                    <FcRules className="text-xl" />
                                }
                            />
                            </FormRow>

                            <FormRow name="destinationsStatsSubHeading" label="Sub Heading" {...validatorProps}>
                            <Field
                                type="text"
                                name="destinationsStatsSubHeading"
                                placeholder="Get insights into popular destinations"
                                component={Input}
                                prefix={
                                    <FcTimeline className="text-xl" />
                                }
                            />
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
                                    {isSubmitting ? 'Updating' : 'Edit'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
        
    </div>
    </AdaptableCard>
    )
}


export default MiddleSection