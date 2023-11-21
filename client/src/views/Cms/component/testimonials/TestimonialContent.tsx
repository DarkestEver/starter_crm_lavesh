import * as yup from 'yup'

import { Avatar, Upload } from '@/components/ui'
import { FcAbout, FcAdvance } from 'react-icons/fc'
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import {
    HiOutlineUser,
    HiPencilAlt,
} from 'react-icons/hi'
import reducer, { deleteTestimonial, fetchTestimonialById, postTestimonial, putTestimonial, useAppDispatch } from './store'
import { useEffect, useState } from 'react';

import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import { RichTextEditor } from '@/components/shared'
import Switcher from '@/components/ui/Switcher'
import { error } from 'console'
import { injectReducer } from '@/store'
import toast from '@/components/ui/toast'
import { useNavigate } from 'react-router-dom'

injectReducer('testimonial',reducer)

export type TestimonialFormModel = {
    name: string
    avatar: string;
    designation: string;
    text: string;
    delayAnimation: string;
    published: Boolean;
}

type props = {
    data?: TestimonialFormModel,
    preview?: string
}

const testimonialSchema = yup.object().shape({
    name: yup.string()
      .required('User Name is required')
      .min(3, 'Name should be at least 3 characters long'),
    avatar: yup.string().required('Avatar is required'),
    designation: yup.string().required('Designation is required'),
    text: yup.string().required('Testimonial Text is required'),
    delayAnimation: yup.string()
      .required('Delay Animation is required')
      .oneOf(['100', '200', '300', '400'], 'Invalid Delay Animation value'),
    published: yup.boolean().required('Visibility status is required'),
  });
  
const TestimonialContent = ({ preview }: props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialData = {
        name: '',
        avatar: '',
        designation: '',
        text: '',
        delayAnimation: '',
        published: true
    }
    
    const [ data , setData ] = useState(initialData)
    
    const id = location.pathname.split('/').pop();
    useEffect(() => {
        const fetch = async () => {
            const res = await dispatch(fetchTestimonialById(id))
            let testimonial = res.payload;
            if(testimonial){
                setData(testimonial)
            }
        }
        fetch()
    },[dispatch, id])

    const onSetFormFile = (
        form: FormikProps<TestimonialFormModel>,
        field: FieldInputProps<TestimonialFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }


    const onFormSubmit = async (
        values: TestimonialFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: any
    ) => {
        try {
            setSubmitting(true);
            let response;
            preview === "save" ?
             response = await dispatch(postTestimonial(values))
            : response = await dispatch(putTestimonial({ id: id, values: values }))

            preview === "save" && resetForm();

            if(response.meta.requestStatus == 'fulfilled'){
                toast.push(<Notification title={'Testimoinial updated'} type="success" />, {
                    placement: 'top-center',
                })
            }
          } catch (error) {
              console.error("Error posting Extras:", error);
              toast.push(<Notification title={'Error! try again later.'} type="danger" />, {
                placement: 'top-center',
            })
          }
        setSubmitting(false)
    }

    const onDelete = async () => {
        dispatch(deleteTestimonial(id))
        toast.push(<Notification title={'Successfully deleted testimonial.'} type="success" />, {
            placement: 'top-center',
        })
        navigate('/cms/testimonials')
    }

    return (
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={testimonialSchema}s
            onSubmit={(values, { setSubmitting ,resetForm}) => {
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
                                        <FcAbout className="text-xl" />
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
                                    prefix={
                                        <HiPencilAlt className='text-xl text-black' />
                                    }
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
                                    prefix={
                                        <FcAdvance className='text-xl' />
                                    }
                                />
                            </FormRow>
                           
                            <div className="mt-4 ltr:text-right">
                                { preview !== "save" ? <>
                                        <Button
                                            className="ltr:mr-2 rtl:ml-2"
                                            type="button"
                                            onClick={onDelete}
                                            >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="solid"
                                            loading={isSubmitting}
                                            type="submit"
                                            >
                                            {isSubmitting ? 'Updating' : 'Edit'}
                                        </Button>
                                    </>
                                    :
                                        <Button
                                            variant="solid"
                                            loading={isSubmitting}
                                            type="submit"
                                            >
                                            {isSubmitting ? 'Updating' : 'Save'}
                                        </Button>
                                }
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}


export default TestimonialContent



