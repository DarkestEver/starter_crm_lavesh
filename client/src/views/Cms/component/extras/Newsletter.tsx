import * as yup from 'yup'

import { Field, Form, Formik } from 'formik'
import { HiOutlinePencil, HiOutlinePencilAlt, HiPencilAlt } from 'react-icons/hi'
import { fetchNewsletter, putNewsletter, useAppDispatch } from './store'

import Button from '@/components/ui/Button'
import { FcAddColumn } from 'react-icons/fc'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import { deleteNewsletter } from './store/extrasSlice'
import toast from '@/components/ui/toast'

export type NewsletterForm = {
    id?: string;
    heading: string;
    subHeading: string;
    inputPlaceholder: string;
    btnText: string;
}

type props = {
    data?: NewsletterForm
}

const newsletterSchema = yup.object().shape({
    heading: yup.string().required('Heading is required'),
    subHeading: yup.string().required('Subheading is required'),
    inputPlaceholder: yup.string().required('Input Placeholder is required'),
    btnText: yup.string().required('Button Text is required'),
});
  
const Newsletter = ( {newsletterData} : props) => {
    const dispatch = useAppDispatch();
    const initialData = {
        heading: newsletterData.heading || '', 
        subHeading: newsletterData.subHeading || '',
        inputPlaceholder: newsletterData.inputPlaceholder || '',
        btnText: newsletterData.btnText || '' 
    }
    
    const onFormSubmit = async (
        values: NewsletterForm,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try {
            setSubmitting(true);
            const response = await dispatch(putNewsletter({ ...values, _id: newsletterData._id }));
            if(response.meta.requestStatus == 'fulfilled'){
                dispatch(fetchNewsletter())
                toast.push(<Notification title={'Newsletter data updated'} type="success" />, {
                    placement: 'top-center',
                })
            }
        } catch (error) {
            console.error("Error posting Extras:", error);
            toast.push(<Notification title={'Error please try  again later.'} type="danger" />, {
                placement: 'top-center',
            })
        }
        setSubmitting(false)
    }

    const onDelete = async () => {
        dispatch(deleteNewsletter(data[0]._id))
        toast.push(<Notification title={'Newsletter data deleted'} type="success" />, {
            placement: 'top-center',
        })
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialData}
            validationSchema={newsletterSchema}
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
                                title="Newsletter"
                                desc="Basic info for a call to action section"
                            />
                           
                           <FormRow name="heading" label="Heading" {...validatorProps}>
                                <Field
                                type="text"
                                autoComplete="off"
                                name="heading"
                                placeholder="Your Travel Journey Starts Here"
                                component={Input}
                                prefix={
                                    <HiPencilAlt className="text-xl text-green-400" />
                                }
                                />
                            </FormRow>

                            <FormRow name="subHeading" label="Sub Heading" {...validatorProps}>
                                <Field
                                type="text"
                                autoComplete="off"
                                name="subHeading"
                                placeholder="Sign up and we`'ll send the best deals to you"
                                component={Input}
                                prefix={
                                    <HiOutlinePencilAlt className="text-xl text-black" />
                                }
                                />
                            </FormRow>

                            <FormRow
                                name="inputPlaceholder"
                                label="Input Placeholder"
                                {...validatorProps}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="inputPlaceholder"
                                placeholder="Your Email"
                                component={Input}
                                prefix={
                                    <FcAddColumn className="text-xl" />
                                }
                                />
                            </FormRow>

                            <FormRow name="btnText" label="Button Text" {...validatorProps}>
                                <Field
                                type="text"
                                autoComplete="off"
                                name="btnText"
                                placeholder="Subscribe"
                                component={Input}
                                prefix={
                                    <HiOutlinePencil className="text-xl text-red-400" />
                                }
                                />
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
                                        {isSubmitting ? "Updating" : "Edit"}
                                    </Button>
                
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}




export default Newsletter