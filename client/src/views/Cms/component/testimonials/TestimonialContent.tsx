import * as Yup from 'yup'

import { Avatar, Upload } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import {
    HiOutlineUser,
    HiOutlineUserCircle,
} from 'react-icons/hi'

import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import { RichTextEditor } from '@/components/shared'
import Switcher from '@/components/ui/Switcher'
import toast from '@/components/ui/toast'

export type TestimonialFormModel = {
    name: string
    avatar: string;
    designation: string;
    text: string;
    delayAnimation: string;
    published: Boolean;
}


type props = {
    data?: TestimonialFormModel
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('User Name is required')
      .min(3, 'Name should be at least 3 characters long'),
    avatar: Yup.string().required('Avatar is required'),
    designation: Yup.string().required('Designation is required'),
    text: Yup.string().required('Testimonial Text is required'),
    delayAnimation: Yup.string()
      .required('Delay Animation is required')
      .oneOf(['100', '200', '300', '400'], 'Invalid Delay Animation value'),
    published: Yup.boolean().required('Visibility status is required'),
  });
  
const TestimonialContent = ({
    data = {
        name: '',
        avatar: '',
        designation: '',
        text: '',
        delayAnimation: '',
        published: true
    },
}: props) => {
    const onSetFormFile = (
        form: FormikProps<TestimonialFormModel>,
        field: FieldInputProps<TestimonialFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (
        values: TestimonialFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm : any
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'Testimoinial updated'} type="success" />, {
            placement: 'top-center',
        })
        resetForm();
        setSubmitting(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={validationSchema}s
            onSubmit={(values, { setSubmitting , resetForm}) => {
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
                                title="Content for Testimonial"
                                desc="Basic info to be displayed on your first testimonial"
                            />
                           
                            <FormRow
                                name="published"
                                label="Publised"
                                {...validatorProps}
                                border={false}
                            >
                                <Field name="published" component={Switcher} />
                            </FormRow>
                           
                            <FormRow
                                name="name"
                                label="Name"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Name"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormRow
                                name="avatar"
                                label="Avatar"
                                {...validatorProps}
                            >
                                <Field name="avatar">
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
                                                    size={60}
                                                    shape="circle"
                                                    icon={<HiOutlineUser />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow>

                            <FormRow name="designation" label="Designation" {...validatorProps}>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="designation"
                                    placeholder="Designation"
                                    component={Input}
                                />
                            </FormRow>

                            <FormRow
                                name="text"
                                label="Testimonial Text"
                                {...validatorProps}
                            >
                                <Field name="text">
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

                            <FormRow name="delayAnimation" label="Animation Delay" {...validatorProps}>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="delayAnimation"
                                    placeholder="Animation Delay (100,200,300,400)"
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


export default TestimonialContent



