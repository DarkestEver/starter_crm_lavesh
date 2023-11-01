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
import toast from '@/components/ui/toast'

export type HomeFormModel = {
    adBanner: {
        title: string;
        image: string;
        meta: string;
        routerPath: string;
        delayAnimation: string;
      };
      testimonialRating: {
        heading: string;
        description: string;
        customers: {
          number: string;
          text: string;
        };
        rating: {
          number: string;
          text: string;
        };
      };
}


type props = {
    data?: HomeFormModel
}


const validationSchema = Yup.object().shape({
  
});


const Extras = ({
    data = {
        adBanner: {
            title: "",
            image: "",
            meta: "",
            routerPath: "",
            delayAnimation: "",
        },
        testimonialRating: {
          heading: "",
          description: "",
          customers: {
            number: "",
            text: "",
          },
          rating: {
            number: "",
            text: "",
          },
        },
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
                           
                           <FormRow
                                name="adBanner"
                                label="Ad Banner Title"
                                {...validatorProps}
                                border={false}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="adBanner.title"
                                placeholder="Ad Banner Title"
                                component={Input}
                            />
                            </FormRow>
                            <FormRow
                                name="adBanner"
                                label="Ad Banner Image"
                                {...validatorProps}
                                border={false}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="adBanner.image"
                                placeholder="Ad Banner Image"
                                component={Input}
                            />
                            </FormRow>

                            
                            <FormRow
                            name="testimonialRating"
                            label="Testimonial Rating Heading"
                            {...validatorProps}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="testimonialRating.heading"
                                placeholder="Testimonial Rating Heading"
                                component={Input}
                            />
                            </FormRow>
                            <FormRow
                            name="testimonialRating"
                            label="Testimonial Rating Description"
                            {...validatorProps}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="testimonialRating.description"
                                placeholder="Testimonial Rating Description"
                                component={Input}
                            />
                            </FormRow>
                            <FormRow
                                name="testimonialRating"
                                label="Number of Customers"
                            {...validatorProps}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="testimonialRating.customers.number"
                                placeholder="Number of Customers"
                                component={Input}
                            />
                            </FormRow>
                            <FormRow
                                name="testimonialRating"
                                label="Customers Text"
                            {...validatorProps}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="testimonialRating.customers.text"
                                placeholder="Customers Text"
                                component={Input}
                            />
                            </FormRow>
                            <FormRow
                                name="testimonialRating"
                                label="Rating Number"
                            {...validatorProps}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="testimonialRating.rating.number"
                                placeholder="Rating Number"
                                component={Input}
                            />
                            </FormRow>
                            <FormRow
                                name="testimonialRating"
                                label="Rating Text"
                            {...validatorProps}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="testimonialRating.rating.text"
                                placeholder="Rating Text"
                                component={Input}
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


export default Extras