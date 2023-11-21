import * as yup from 'yup'

import { Avatar, Upload } from '@/components/ui'
import { FcAdvance, FcRating } from 'react-icons/fc'
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import { HiOutlineGlobeAlt, HiOutlineLocationMarker, HiOutlinePencil, HiOutlineTag, HiPencil, HiPencilAlt, HiPhotograph } from 'react-icons/hi'
import reducer, { deleteHotel, fetchHotelById, postHotel, putHotel, useAppDispatch } from './store'
import { useEffect, useState } from 'react'

import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import HotelImages from './HotelImages'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import { RichTextEditor } from '@/components/shared'
import { injectReducer } from '@/store'
import toast from '@/components/ui/toast'
import { useNavigate } from 'react-router-dom'

injectReducer('hotel',reducer)

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

const hotelSchema = yup.object().shape({
    tag: yup.string().required('Tag is required'),
    slideImg: yup.array()
      .required('Hotel Images are required')
      .min(1, 'At least one slide image is required'),
    img: yup.string().required('Image is required'),
    param: yup.string().required('Param is required'),
    title: yup.string().required('Title is required'),
    btnHref: yup.string().required('Button Href is required'),
    overview: yup.string().required('Overview is required'),
    location: yup.string().required('Location is required'),
    ratings: yup.string()
      .required('Ratings are required')
      .matches(/^\d+(\.\d+)?$/, 'Ratings must be a number'),
    numberOfReviews: yup.string()
      .required('Number of Reviews is required')
      .matches(/^[0-9]+$/, 'Number of Reviews must be a valid number'),
    delayAnimation: yup.string()
      .required('Delay Animation is required')
      .matches(/^(100|200|300|400)$/, 'Delay Animation must be 100, 200, 300, or 400'),
    routePath: yup.string().required('Route Path is required'),
  });
  

const HotelContent = ({ preview }) => {
    const dispatch = useAppDispatch();
    const initialData = {
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
    };
    
    const [ data , setData ] = useState(initialData)
    const navigate = useNavigate();

    const id = location.pathname.split('/').pop();
    useEffect(() => {
        const fetch = async () => {
            const res = await dispatch(fetchHotelById(id))
            let hotel = res.payload;
            if(hotel){
                setData(hotel)
            }
        }
        fetch()
    },[dispatch, id])
    
    const onSetFormFile = (
        form: FormikProps<HotelFormModel>,
        field: FieldInputProps<HotelFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = async (
        values: HotelFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: any
    ) => {
        try {
            setSubmitting(true);
            let response;
            preview === "save" ?
            response = await dispatch(postHotel(values)) 
            : response = await dispatch(putHotel({ id: id, values: values }))
            
            preview === "save" && resetForm();

            if(response.meta.requestStatus == 'fulfilled'){
                toast.push(<Notification title={'Hotel data updated'} type="success" />, {
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
        dispatch(deleteHotel(id))
        toast.push(<Notification title={'Successfully deleted hotel.'} type="success" />, {
            placement: 'top-center',
        })
        navigate('/cms/hotels')
    }

    return (
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={hotelSchema}
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
                                    prefix={
                                        <HiPencilAlt className='text-xl text-black' />
                                    }
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
                                    prefix={
                                        <HiOutlineLocationMarker className='text-xl text-red-400' />
                                    }
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
                                    prefix={
                                        <HiOutlineTag className='text-xl text-green-400' />
                                    }
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
                                    prefix={
                                        <FcRating className='text-xl' />
                                    }
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
                                    prefix={
                                        <HiOutlinePencil className='text-xl' />
                                    }
                                />
                            </FormRow>

                            <FormRow
                                name="param"
                                label="Slug"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="param"
                                    placeholder="Param"
                                    component={Input}
                                    prefix={
                                        <HiOutlineGlobeAlt className='text-xl text-blue-400' />
                                    }
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
                                    prefix={
                                        <HiPencil className='text-xl text-blue-400' />
                                    }
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
                                    prefix={
                                        <FcAdvance className='text-xl' />
                                    }
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
                                    prefix={
                                        <HiOutlineGlobeAlt className='text-xl text-blue-400' />
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




export default HotelContent