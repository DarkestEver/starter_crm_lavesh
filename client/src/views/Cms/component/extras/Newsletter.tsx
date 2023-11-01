import * as Yup from 'yup'

import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FormikProps } from 'formik'

import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import { HiOutlineUserCircle } from 'react-icons/hi'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

export type HomeFormModel = {
    heading: string;
    subHeading: string;
    inputPlaceholder: string;
    btnText: string;
}

type props = {
    data?: HomeFormModel
}

const validationSchema = Yup.object().shape({
    heading: Yup.string().required('Heading is required'),
    subHeading: Yup.string().required('Subheading is required'),
    inputPlaceholder: Yup.string().required('Input Placeholder is required'),
    btnText: Yup.string().required('Button Text is required'),
});

const Newsletter = ({
    data = {
        heading: '',
        subHeading: '',
        inputPlaceholder: '',
        btnText: '',
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
        toast.push(<Notification title={'Newsletter content updated'} type="success" />, {
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
                                    <HiOutlineUserCircle className="text-xl" />
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
                                    <HiOutlineUserCircle className="text-xl" />
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
                                    <HiOutlineUserCircle className="text-xl" />
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
                                    <HiOutlineUserCircle className="text-xl" />
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




export default Newsletter