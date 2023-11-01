import * as Yup from 'yup'

import { Avatar, DatePicker, Select, Upload } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import { HiOutlineUser, HiOutlineUserCircle, HiPhotograph } from 'react-icons/hi'

import AdaptableCard from '@/components/shared/AdaptableCard'
import Button from '@/components/ui/Button'
import CreatableSelect from 'react-select/creatable'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import ReactHtmlParser from 'html-react-parser'
import { RichTextEditor } from '@/components/shared'
import toast from '@/components/ui/toast'
import { useState } from 'react'

export type BlogFormModel = {
    img: string;
    title: string;
    param: string;
    date: string;
    delayAnimation: string;
    details: string;
    tag: string;
}

type props = {
    data?: BlogFormModel
}

const validationSchema = Yup.object().shape({
    img: Yup.string().required('Image URL is required'),
    title: Yup.string().required('Title is required'),
    param: Yup.string().required('Parameter is required'),
    date: Yup.string().required('Date is required'),
    delayAnimation: Yup.string()
      .required('Delay Animation is required')
      .matches(/^(100|200|300|400)$/, 'Invalid Delay Animation'),
    details: Yup.string().required('Details is required'),
    // tag: Yup.string(),
  });


const BlogContent = ({
    data = {
        img: '',
        title: '',
        param: '',
        date: '',
        delayAnimation: '',
        details: '',
        tag: '',
    },
}: props) => {
    const onSetFormFile = (
        form: FormikProps<BlogFormModel>,
        field: FieldInputProps<BlogFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (
        values: BlogFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: any
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'Blog updated'} type="success" />, {
            placement: 'top-center',
        })
        resetForm()
        setSubmitting(false)
    }
    const [ mode , setMode ] = useState('edit');

    const onModeChange = (mode: string) => {
        // dispatch(setMode(mode))
        setMode(mode);
    }
    

    return (
        <AdaptableCard>
        <div className="max-w-[800px] mx-auto">
            
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting,resetForm }) => {
                setSubmitting(true);
                setTimeout(() => {
                onFormSubmit(values, setSubmitting,resetForm);
                }, 1000);
            }}
            >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors };
                return (
                    <Form>
                    <div className="flex justify-between items-center mb-4">
                        <h3>
                            {mode === 'edit' && <span>Edit Article</span>}
                            {/* {mode === 'add' && <span>Add Article</span>} */}
                            {mode === 'preview' && <span>Preview Article</span>}
                        </h3>
                        {mode === 'preview' ? (
                            <Button
                                size="sm"
                                type="button"
                                onClick={() =>
                                    // onModeChange(id ? 'edit' : 'add')
                                    onModeChange('edit')
                                }
                            >
                                Back
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                type="button"
                                onClick={() => onModeChange('preview')}
                            >
                                Preview
                            </Button>
                        )}
                    </div>
                    
                    {mode === 'preview' ? (
                        <div className="mt-6">
                            <h4 className="mb-4">{values.title}</h4>
                            <div className="prose dark:prose-invert max-w-none">
                                {ReactHtmlParser(values.details || '')}
                            </div>
                        </div>
                    ) : (

                    <FormContainer>

                    <FormItem label="Title" {...validatorProps}>
                        <Field
                            type="text"
                            autoComplete="off"
                            name="title"
                            placeholder="Title"
                            component={Input}
                        />
                    </FormItem>

                    <FormItem
                        label="Tags"
                        {...validatorProps}
                    >
                        <Field name="tag">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    isMulti
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    value={values.tag}
                                    onChange={(option) =>
                                        form.setFieldValue(field.name, option)
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                    
                    <FormItem
                        label="Blog Content"
                        {...validatorProps}
                    >
                        <Field name="details">
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

                <div className='flex justify-between flex-row'>

                  <div className='flex w-full sm:w-1/2'>
                    <FormItem
                        label="Thumbnail"
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
                                        uploadLimit={4}
                                        onChange={(files) =>
                                            onSetFormFile(form,field,files)
                                        }
                                        onFileRemove={(files) =>
                                            onSetFormFile(form,field,files)
                                        }
                                    >
                                        <Avatar
                                            className="w-[300px] h-[220px] border-2 border-white dark:border-gray-800 shadow-lg "
                                            shape="square"
                                            icon={<HiPhotograph />}
                                            {...avatarProps}
                                        />
                                    </Upload>
                                )
                            }}
                        </Field>
                    </FormItem>
                  </div>

                <div className='flex flex-col w-full sm:w-1/2'>
                    <FormItem label="Slug" {...validatorProps}>
                        <Field
                        type="text"
                        autoComplete="off"
                        name="param"
                        placeholder="/blogname"
                        component={Input}
                        />
                    </FormItem>

                    <FormItem label="Date" {...validatorProps}>
                        <Field
                            type="text"
                            autoComplete="off"
                            name="date"
                            placeholder="DD-MM-YY"
                            component={Input}
                        />
                    </FormItem>

                    <FormItem label="Delay Animation" {...validatorProps}>
                        <Field
                        type="text"
                        autoComplete="off"
                        name="delayAnimation"
                        placeholder="Animation Delay (100,200,300,400)"
                        component={Input}
                        />
                    </FormItem>
                  </div>
                </div>
                
                    <div className="mt-4 ltr:text-right">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            onClick={() => resetForm()}
                        >
                        Reset
                        </Button>
                        <Button variant="solid" type="submit" loading={isSubmitting}>
                        {isSubmitting ? 'Updating' : 'Save'}
                        </Button>
                    </div>
                    </FormContainer>
                    )}
                </Form>
                );
            }}
            </Formik>

        </div>
    </AdaptableCard>

    )
}




export default BlogContent