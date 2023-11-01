import * as Yup from 'yup'

import { Avatar, Upload } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import { HiOutlineUser, HiOutlineUserCircle, HiPhotograph } from 'react-icons/hi'

import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import HotelImages from './HotelImages'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import { RichTextEditor } from '@/components/shared'
import toast from '@/components/ui/toast'

export type HotelFormModel = {
    tag: string;
    slideImg: {
        id: string
        name: string
        img: string
    }[];
    img: string;
    param: string;
    title: string;
    btnHref: string;
    overview: string;
    location: string;
    ratings: string;
    numberOfReviews: string;
    delayAnimation: string;
    routePath: string;
}


type props = {
    data?: HotelFormModel
}

const validationSchema = Yup.object().shape({
    tag: Yup.string().required('Tag is required'),
    slideImg: Yup.array()
      .required('Hotel Images are required')
      .min(1, 'At least one slide image is required'),
    img: Yup.string().required('Image is required'),
    param: Yup.string().required('Param is required'),
    title: Yup.string().required('Title is required'),
    btnHref: Yup.string().url('Button Href must be a valid URL'),
    overview: Yup.string().required('Overview is required'),
    location: Yup.string().required('Location is required'),
    ratings: Yup.string()
      .required('Ratings are required')
      .matches(/^\d+(\.\d+)?$/, 'Ratings must be a number'),
    numberOfReviews: Yup.string()
      .required('Number of Reviews is required')
      .matches(/^[0-9]+$/, 'Number of Reviews must be a valid number'),
    delayAnimation: Yup.string()
      .required('Delay Animation is required')
      .matches(/^(100|200|300|400)$/, 'Delay Animation must be 100, 200, 300, or 400'),
    routePath: Yup.string().required('Route Path is required'),
  });
  

const HotelContent = ({
    data = {
        tag: '',
        slideImg: [],
        img: '',
        param: '',
        title: '',
        btnHref: '',
        overview: '',
        location: '',
        ratings: '',
        numberOfReviews: '',
        delayAnimation: '',
        routePath: '',
    },
}: props) => {
    const onSetFormFile = (
        form: FormikProps<HotelFormModel>,
        field: FieldInputProps<HotelFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (
        values: HotelFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: any
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'Hotel listed'} type="success" />, {
            placement: 'top-center',
        })
        resetForm()
        setSubmitting(false)
    }

    return (
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
                                title="Hotel"
                                desc="Basic info for your listed hotels"
                            />

                            <FormRow
                                name="title"
                                label="Title"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="title"
                                    placeholder="Title"
                                    component={Input}
                                />
                            </FormRow>

                            
                            <FormRow
                                name="overview"
                                label="Hotel Description"
                                {...validatorProps}
                            >
                                <Field name="overview">
                                    {({ field, form }: FieldProps) => (
                                        <RichTextEditor
                                            value={field.value}
                                            onChange={(val) =>
                                                form.setFieldValue(field.name, val)
                                            }
                                        />
                                    )}
                                </Field>
                            </FormRow>

                            <FormRow
                                name="img"
                                label="Starred Hotel Image"
                                {...validatorProps}
                            >
                                <Field name="img">
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
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={90}
                                                    shape="square"
                                                    icon={<HiPhotograph />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow>

                            
                            <FormRow
                                name="location"
                                label="Location"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="location"
                                    placeholder="Location"
                                    component={Input}
                                />
                            </FormRow>

                            
                            <FormRow
                                name="slideImg"
                                label="Hotel Images"
                                {...validatorProps}
                            >
                                <HotelImages values={values} />
                            </FormRow>
                           
                           <FormRow
                                name="tag"
                                label="Tag"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="tag"
                                    placeholder="Tag"
                                    component={Input}
                                />
                            </FormRow>

                            
                            <FormRow
                                name="ratings"
                                label="Ratings"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="ratings"
                                    placeholder="Ratings"
                                    component={Input}
                                />
                            </FormRow>

                            <FormRow
                                name="numberOfReviews"
                                label="Number of Reviews"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="numberOfReviews"
                                    placeholder="Number of Reviews"
                                    component={Input}
                                />
                            </FormRow>

                            <FormRow
                                name="param"
                                label="Param"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="param"
                                    placeholder="Param"
                                    component={Input}
                                />
                            </FormRow>

                            <FormRow
                                name="btnHref"
                                label="Button Href"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="btnHref"
                                    placeholder="Button Href"
                                    component={Input}
                                />
                            </FormRow>


                            <FormRow
                                name="delayAnimation"
                                label="Delay Animation"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="delayAnimation"
                                    placeholder="Animation Delay (100,200,300,400)"
                                    component={Input}
                                />
                            </FormRow>

                            <FormRow
                                name="routePath"
                                label="Route Path"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="routePath"
                                    placeholder="/hotel/[hotel-name]"
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




export default HotelContent