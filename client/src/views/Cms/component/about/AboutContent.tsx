import * as yup from 'yup'

import { AdaptableCard, RichTextEditor } from '@/components/shared'
import { Avatar, Switcher, Upload } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import { HiPencil, HiPencilAlt } from 'react-icons/hi'
import { injectReducer, useAppDispatch } from '@/store'
import reducer, { editAbout, fetchAbout } from './store'

import Button from '@/components/ui/Button'
import { FcAddImage } from 'react-icons/fc'
import FormDesription from '../common/FormDescription'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

injectReducer('about', reducer)

export type AboutFormModel = {
    topHeader: {
      heading: string;
      subHeading: string;
    };
    blockGuide: {
      heading: string;
      subHeading: string;
    };
    mainHeader: {
      heading: string;
      subHeading: string;
      description: string;
      image: string;
      counter: Boolean;
    };
    testimonial: {
      heading: string;
      subHeading: string;
    };
}

type props = {
    data?: AboutFormModel
}

const validationSchema = yup.object().shape({
    topHeader: yup.object().shape({
      heading: yup.string().required('topHeader Heading is required'),
      subHeading: yup.string().required('topHeader Subheading is required'),
    }),
    blockGuide: yup.object().shape({
      heading: yup.string().required('blockGuide Heading is required'),
      subHeading: yup.string().required('blockGuide Subheading is required'),
    }),
    mainHeader: yup.object().shape({
      heading: yup.string().required('mainHeader Heading is required'),
      subHeading: yup.string().required('mainHeader Subheading is required'),
      description: yup.string().required('mainHeader Description is required'),
      image: yup.string().required('mainHeader Image is required'),
      counter: yup.boolean()
    }),
    testimonial: yup.object().shape({
      heading: yup.string().required('testimonial Heading is required'),
      subHeading: yup.string().required('testimonial Subheading is required'),
    }),
});
  
  
const AboutContent = ({ data }: props) => {
    const initialData = {
      topHeader: {
        heading: data?.topHeader?.heading || '',
        subHeading: data?.topHeader?.subHeading || '',
      },
      blockGuide: {
        heading: data?.blockGuide?.heading || '',
        subHeading: data?.blockGuide?.subHeading || '',
      },
      mainHeader: {
        heading: data?.mainHeader?.heading || '',
        subHeading: data?.mainHeader?.subHeading || '',
        description: data?.mainHeader?.description || '',
        image: data?.mainHeader?.image || '',
        counter: data?.mainHeader?.counter || true,
      },
      testimonial: {
        heading: data?.testimonial?.heading || '',
        subHeading: data?.testimonial?.subHeading || '',
      },
    };
      
    const dispatch = useAppDispatch();

    const onSetFormFile = (
        form: FormikProps<AboutFormModel>,
        field: FieldInputProps<AboutFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = async (
        values: AboutFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        try {
            setSubmitting(true);
            const response = await dispatch(editAbout({ ...values, _id: data._id }));
            if(response.meta.requestStatus == 'fulfilled'){
                dispatch(fetchAbout())
                toast.push(<Notification title={'About page updated'} type="success" />, {
                    placement: 'top-center',
                })
            }
        } catch (error) {
            console.error("Error posting about page:", error);
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
                return (
                <Form>
                        <FormContainer>
                            <FormDesription
                                title="Top About Page Heading"
                                desc="Basic info for your about page"
                                className='mb-3'
                            />

                            <FormItem
                                label="Heading"
                                invalid={(errors.topHeader?.heading && touched.topHeader?.heading) as boolean}
                                errorMessage={errors.topHeader?.heading}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="topHeader.heading"
                                placeholder="Find Next Place To Visit"
                                component={Input}
                                prefix={
                                    <HiPencilAlt className='text-xl text-green-700' />
                                }
                                />
                            </FormItem>
                           

                            <FormItem
                                label="Subheading"
                                invalid={(errors.topHeader?.subHeading && touched.topHeader?.subHeading) as boolean}
                                errorMessage={errors.topHeader?.subHeading}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="topHeader.subHeading"
                                placeholder="Your trusted trip companion"
                                component={Input}
                                prefix={
                                    <HiPencil className='text-xl text-gray-500' />
                                }
                                />
                            </FormItem>

                            {/* blockGuide Section */}
                            <FormDesription
                                title="blockGuide Heading"
                                desc="Basic info for your about page"
                                className='mb-3'
                            />
                            <FormItem
                                label="Heading"
                                invalid={(errors.blockGuide?.heading && touched.blockGuide?.heading) as boolean}
                                errorMessage={errors.blockGuide?.heading}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="blockGuide.heading"
                                placeholder="Why Choose Us?"
                                component={Input}
                                prefix={
                                    <HiPencilAlt className='text-xl text-green-700' />
                                }
                                />
                            </FormItem>

                            <FormItem
                                label="Subheading"
                                invalid={(errors.blockGuide?.subHeading && touched.blockGuide?.subHeading) as boolean}
                                errorMessage={errors.blockGuide?.subHeading}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="blockGuide.subHeading"
                                placeholder="These popular destinations have a lot to offer"
                                component={Input}
                                prefix={
                                    <HiPencil className='text-xl text-green-400' />
                                }
                                />
                            </FormItem>

                            {/* mainHeader Section */}
                            <FormDesription
                                title="Main About Page Header"
                                desc="Basic info for your about page"
                                className='mb-3'
                            />
                            <FormItem
                                label="Heading"
                                invalid={(errors.mainHeader?.heading && touched.mainHeader?.heading) as boolean}
                                errorMessage={errors.mainHeader?.heading}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="mainHeader.heading"
                                placeholder="About Eurasia"
                                component={Input}
                                prefix={
                                    <HiPencilAlt className='text-xl text-blue-700' />
                                }
                                />
                            </FormItem>

                            <FormItem
                                label="Subheading"
                                invalid={(errors.mainHeader?.subHeading && touched.mainHeader?.subHeading) as boolean}
                                errorMessage={errors.mainHeader?.subHeading}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="mainHeader.subHeading"
                                placeholder="Embark on Unforgettable Journeys with Us"
                                component={Input}
                                prefix={
                                    <HiPencil className='text-xl text-blue-400' />
                                }
                                />
                            </FormItem>

                            <FormItem
                                label="Description"
                                invalid={(errors.mainHeader?.description && touched.mainHeader?.description) as boolean}
                                errorMessage={errors.mainHeader?.description}
                            >
                                <Field name="mainHeader.description">
                                    {({ field, form }: FieldProps) => (
                                        <RichTextEditor
                                            value={field.value}
                                            onChange={(val) =>
                                                form.setFieldValue(field.name, val)
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>

                        <div className='flex'>

                            <FormItem
                                label="Image"
                                className='w-1/2 h-auto'
                                invalid={(errors.mainHeader?.image && touched.mainHeader?.image) as boolean}
                                errorMessage={errors.mainHeader?.image}
                            >
                                <Field name="mainHeader.image">
                                    {({ field, form }: FieldProps) => {
                                        const avatarProps = field.value
                                            ? { src: field.value }
                                            : {}
                                        return (
                                            <Upload
                                                className="cursor-pointer"
                                                showList={false}
                                                uploadLimit={1}
                                                onChange={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                        )
                                                    }
                                                    onFileRemove={(files) =>
                                                        onSetFormFile(
                                                            form,
                                                            field,
                                                            files
                                                            )
                                                        }
                                                        >
                                                <Avatar
                                                    className="w-[250px] h-[160px] border-2 border-white dark:border-gray-800 shadow-lg"
                                                    shape="square"
                                                    icon={<FcAddImage size={42} />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormItem>


                            <FormItem
                                label="Counter"
                                className='w-1/2 h-auto'
                                invalid={(errors.mainHeader?.counter && touched.mainHeader?.counter) as boolean}
                                >
                                <Field
                                    name="mainHeader.counter"
                                    component={Switcher}
                                />
                            </FormItem>
                        </div>

                            {/* testimonial Section */}
                            <FormDesription
                                title="testimonial Section Header"
                                desc="Basic info for your about page"
                                className='mb-3'
                                />
                            <FormItem
                                label="testimonial Heading"
                                invalid={(errors.testimonial?.heading && touched.testimonial?.heading) as boolean}
                                errorMessage={errors.testimonial?.heading}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="testimonial.heading"
                                    placeholder="Overheard from travelers"
                                    component={Input}
                                    prefix={
                                        <HiPencilAlt className='text-xl text-red-700' />
                                    }
                                />
                            </FormItem>

                            <FormItem
                                label="testimonial Subheading"
                                invalid={(errors.testimonial?.subHeading && touched.testimonial?.subHeading) as boolean}
                                errorMessage={errors.testimonial?.subHeading}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="testimonial.subHeading"
                                    placeholder="These popular destinations have a lot to offer"
                                    component={Input}
                                    prefix={
                                        <HiPencil className='text-xl text-red-400' />
                                    }
                                />

                            </FormItem>

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


export default AboutContent