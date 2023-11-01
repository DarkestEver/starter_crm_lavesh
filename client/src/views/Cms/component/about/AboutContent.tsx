import * as Yup from 'yup'

import { AdaptableCard, RichTextEditor } from '@/components/shared'
import { Avatar, Switcher, Upload } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'

import Button from '@/components/ui/Button'
import { FcAddImage } from 'react-icons/fc'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import { HiOutlineUser } from 'react-icons/hi'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

export type AboutFormModel = {
    TopHeader: {
        heading: string;
        subHeading: string;
      };
      BlockGuide: {
        heading: string;
        subHeading: string;
      };
      MainHeader: {
        heading: string;
        subHeading: string;
        description: string;
        image: string;
        counter: Boolean;
      };
      Testimonial: {
        heading: string;
        subHeading: string;
      };
}

type props = {
    data?: AboutFormModel
}

const validationSchema = Yup.object().shape({
    TopHeader: Yup.object().shape({
      heading: Yup.string().required('TopHeader Heading is required'),
      subHeading: Yup.string().required('TopHeader Subheading is required'),
    }),
    BlockGuide: Yup.object().shape({
      heading: Yup.string().required('BlockGuide Heading is required'),
      subHeading: Yup.string().required('BlockGuide Subheading is required'),
    }),
    MainHeader: Yup.object().shape({
      heading: Yup.string().required('MainHeader Heading is required'),
      subHeading: Yup.string().required('MainHeader Subheading is required'),
      description: Yup.string().required('MainHeader Description is required'),
      image: Yup.string().required('MainHeader Image is required'),
      counter: Yup.number()
        .required('MainHeader Counter is required')
        .min(0, 'Counter must be a positive number'),
    }),
    Testimonial: Yup.object().shape({
      heading: Yup.string().required('Testimonial Heading is required'),
      subHeading: Yup.string().required('Testimonial Subheading is required'),
    }),
  });
  

const AboutContent = ({
    data = {
        TopHeader: {
            heading: '',
            subHeading: '',
          },
          BlockGuide: {
            heading: '',
            subHeading: '',
          },
          MainHeader: {
            heading: '',
            subHeading: '',
            description: '',
            image: '',
            counter: true,
          },
          Testimonial: {
            heading: '',
            subHeading: '',
          },
    },
}: props) => {
    const onSetFormFile = (
        form: FormikProps<AboutFormModel>,
        field: FieldInputProps<AboutFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (
        values: AboutFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: any
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'About page updated'} type="success" />, {
            placement: 'top-center',
        })
        // resetForm()
        setSubmitting(false)
    }


    return (
        <AdaptableCard>
        <div className="max-w-[800px] mx-auto">
            
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting,resetForm }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting,resetForm)
                }, 1000)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
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
                                invalid={(errors.TopHeader?.heading && touched.TopHeader?.heading) as boolean}
                                errorMessage={errors.TopHeader?.heading}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="TopHeader.heading"
                                    placeholder="Looking for joy?"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="Subheading"
                                invalid={(errors.TopHeader?.subHeading && touched.TopHeader?.subHeading) as boolean}
                                errorMessage={errors.TopHeader?.subHeading}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="TopHeader.subHeading"
                                placeholder="Your trusted trip companion"
                                component={Input}
                                />
                            </FormItem>

                            {/* BlockGuide Section */}
                            <FormDesription
                                title="BlockGuide Heading"
                                desc="Basic info for your about page"
                                className='mb-3'
                            />
                            <FormItem
                                label="Heading"
                                invalid={(errors.BlockGuide?.heading && touched.BlockGuide?.heading) as boolean}
                                errorMessage={errors.BlockGuide?.heading}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="BlockGuide.heading"
                                placeholder="Why Choose Us?"
                                component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="Subheading"
                                invalid={(errors.BlockGuide?.subHeading && touched.BlockGuide?.subHeading) as boolean}
                                errorMessage={errors.BlockGuide?.subHeading}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="BlockGuide.subHeading"
                                placeholder="These popular destinations have a lot to offer"
                                component={Input}
                                />
                            </FormItem>

                            {/* MainHeader Section */}
                            <FormDesription
                                title="Main About Page Header"
                                desc="Basic info for your about page"
                                className='mb-3'
                            />
                            <FormItem
                                label="Heading"
                                invalid={(errors.MainHeader?.heading && touched.MainHeader?.heading) as boolean}
                                errorMessage={errors.MainHeader?.heading}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="MainHeader.heading"
                                placeholder="About Eurasia"
                                component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="Subheading"
                                invalid={(errors.MainHeader?.subHeading && touched.MainHeader?.subHeading) as boolean}
                                errorMessage={errors.MainHeader?.subHeading}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="MainHeader.subHeading"
                                placeholder="Embark on Unforgettable Journeys with Us"
                                component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="Description"
                                invalid={(errors.MainHeader?.description && touched.MainHeader?.description) as boolean}
                                errorMessage={errors.MainHeader?.description}
                            >
                                <Field name="MainHeader.description">
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
                                invalid={(errors.MainHeader?.image && touched.MainHeader?.image) as boolean}
                                errorMessage={errors.MainHeader?.image}
                            >
                                <Field name="MainHeader.image">
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
                                invalid={(errors.MainHeader?.counter && touched.MainHeader?.counter) as boolean}
                                >
                                <Field
                                    name="MainHeader.counter"
                                    component={Switcher}
                                />
                            </FormItem>
                        </div>

                            {/* Testimonial Section */}
                            <FormDesription
                                title="Testimonial Section Header"
                                desc="Basic info for your about page"
                                className='mb-3'
                                />
                            <FormItem
                                label="Testimonial Heading"
                                invalid={(errors.Testimonial?.heading && touched.Testimonial?.heading) as boolean}
                                errorMessage={errors.Testimonial?.heading}
                                >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="Testimonial.heading"
                                placeholder="Overheard from travelers"
                                component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="Testimonial Subheading"
                                invalid={(errors.Testimonial?.subHeading && touched.Testimonial?.subHeading) as boolean}
                                errorMessage={errors.Testimonial?.subHeading}
                            >
                                <Field
                                type="text"
                                autoComplete="off"
                                name="Testimonial.subHeading"
                                placeholder="These popular destinations have a lot to offer"
                                component={Input}
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
                                    {isSubmitting ? 'Updating' : 'Save'}
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