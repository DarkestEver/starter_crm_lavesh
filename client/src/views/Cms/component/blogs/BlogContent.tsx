import * as yup from 'yup'

import { Avatar, DatePicker, Select, Upload } from '@/components/ui'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import { HiOutlineCalendar, HiOutlineGlobeAlt, HiPencilAlt, HiPhotograph } from 'react-icons/hi'
import reducer, { deleteBlog, fetchBlogById, postBlog, putBlog, useAppDispatch } from './store'
import { useEffect, useState } from 'react'

import AdaptableCard from '@/components/shared/AdaptableCard'
import Button from '@/components/ui/Button'
import CreatableSelect from 'react-select/creatable'
import { FcAdvance } from 'react-icons/fc'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import ReactHtmlParser from 'html-react-parser'
import { RichTextEditor } from '@/components/shared'
import { injectReducer } from '@/store'
import toast from '@/components/ui/toast'
import { useNavigate } from 'react-router-dom'

injectReducer('blog',reducer)

export type BlogFormModel = {
    img: string;
    title: string;
    param: string;
    date: string;
    delayAnimation: string;
    details: string;
    tag: {
        label: string
        value: string
    }[];
}
type props = {
    data?: BlogFormModel
}

const blogSchema = yup.object().shape({
    img: yup.string().required('Image is required'),
    title: yup.string().required('Title is required'),
    param: yup.string().required('Parameter is required'),
    date: yup.string().required('Date is required'),
    delayAnimation: yup.string()
      .required('Delay Animation is required')
      .matches(/^(100|200|300|400)$/, 'Invalid Delay Animation'),
    details: yup.string().required('Blog Content is required'),
    tag: yup.array().required('Tag is required'),
  });

const BlogContent = ({ preview }: props) => {
    const initialData = {
        img: '',
        title: '',
        param: '',
        date: '',
        delayAnimation: '',
        details: '',
        tag: [],
    };

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [ data , setData ] = useState(initialData)

    const id = location.pathname.split('/').pop();
    useEffect(() => {
        const fetch = async () => {
            const res = await dispatch(fetchBlogById(id))
            let blog = res.payload;
            if(blog){
                setData(blog)
            }
        }
        fetch()
    },[dispatch, id])
    

    const onSetFormFile = (
        form: FormikProps<BlogFormModel>,
        field: FieldInputProps<BlogFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = async (
        values: BlogFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: any
    ) => {
        try {
            setSubmitting(true);
            let response;
            preview === "save" ?
            response = await dispatch(postBlog(values)) 
            : response = await dispatch(putBlog({ id: id, values: values }))

            preview === "save" && resetForm();

            if(response.meta.requestStatus == 'fulfilled'){
                toast.push(<Notification title={'Blog updated'} type="success" />, {
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
    const [ mode , setMode ] = useState('edit');

    const onModeChange = (mode: string) => {
        setMode(mode);
    }

    const onDelete = async () => {
        dispatch(deleteBlog(id))
        toast.push(<Notification title={'Successfully deleted blog.'} type="success" />, {
            placement: 'top-center',
        })
        navigate('/cms/blogs')
    }

    return (
        <AdaptableCard>
        <div className="max-w-[800px] mx-auto">
            
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={blogSchema}
            onSubmit={(values, { setSubmitting,resetForm }) => {
                setSubmitting(true);
                setTimeout(() => {
                onFormSubmit(values, setSubmitting,resetForm);
                }, 1000);
            }}
            >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                return (
                    <Form>
                    <div className="flex justify-between items-center mb-4">
                        <h3>
                            {mode === 'edit' && <span>Edit Article</span>}
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

                    <FormItem 
                        label="Title"
                        invalid={(errors.title && touched.title) as boolean}
                        errorMessage={errors.title}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="title"
                            placeholder="Title"
                            component={Input}
                            prefix={
                                <HiPencilAlt className='text-xl text-black' />
                            }
                        />
                    </FormItem>

                    <FormItem
                        label="Tag"
                        invalid={
                            (errors.tag && touched.tag) as unknown as boolean
                        }
                        errorMessage={errors.tag as string}
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
                        invalid={(errors.details && touched.details) as boolean}
                        errorMessage={errors.details}
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
                        {/* <ErrorMessage name="details" /> */}
                    </FormItem>

                <div className='flex justify-between flex-row'>

                  <div className='flex w-full sm:w-1/2'>
                    <FormItem
                        label="Thumbnail"
                        invalid={(errors.img && touched.img) as boolean}
                        errorMessage={errors.img}
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
                        </Field> <br/>
                        
                    </FormItem>
                  </div>

                <div className='flex flex-col w-full sm:w-1/2'>
                    <FormItem 
                        label="Slug" 
                        invalid={(errors.param && touched.param) as boolean}
                        errorMessage={errors.param}
                    >
                        <Field
                        type="text"
                        autoComplete="off"
                        name="param"
                        placeholder="/blogname"
                        component={Input}
                        prefix={
                            <HiOutlineGlobeAlt className='text-xl text-blue-400' />
                        }
                        />
                    </FormItem>

                    <FormItem 
                        label="Date" 
                        invalid={(errors.date && touched.date) as boolean}
                        errorMessage={errors.date}
                    >
                        <Field name="date">
                            {({ field, form }: FieldProps) => (
                                <DatePicker
                                    value={field.value}
                                    defaultValue={new Date()}
                                    inputPrefix={<HiOutlineCalendar className="text-lg text-yellow-500" />}
                                    inputSuffix={null}
                                    onChange={(val) =>
                                        form.setFieldValue(field.name, val)
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>

                    <FormItem 
                        label="Delay Animation"
                        invalid={(errors.delayAnimation && touched.delayAnimation) as boolean}
                        errorMessage={errors.delayAnimation}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="delayAnimation"
                            placeholder="Animation Delay (100,200,300,400)"
                            component={Input}
                            prefix={
                                <FcAdvance className='text-xl text-blue-400' />
                            }
                        />
                    </FormItem>
                  </div>
                </div>
                
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