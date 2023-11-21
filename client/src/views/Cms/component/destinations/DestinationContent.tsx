import * as yup from 'yup'

import type { ControlProps, OptionProps } from 'react-select'
import {
     FcAddImage,
     FcClock,
     FcCurrencyExchange,
     FcDepartment,
     FcGlobe,
     FcLibrary,
     FcNightLandscape,
     FcPlus
} from 'react-icons/fc'
import { Field, FieldArray, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import {
    HiCheck,
    HiOutlineGlobeAlt,
    HiOutlineMinusCircle,
    HiPencil,
    HiRewind,
    HiServer,
} from 'react-icons/hi'
import reducer, { deleteDestination, fetchDestinationById, postDestination, putDestination, useAppDispatch, useAppSelector } from './store'
import { useEffect, useState } from 'react'

import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import HotelImages from '../hotels/HotelImages'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import { RichTextEditor } from '@/components/shared'
import { SLICE_NAME } from "./store/destinationSlice"
import Select from '@/components/ui/Select'
import Upload from '@/components/ui/Upload'
import { components } from 'react-select'
import { injectReducer } from '@/store'
import toast from '@/components/ui/toast'
import { useNavigate } from 'react-router-dom'

injectReducer(SLICE_NAME, reducer)

export type DestinationFormModel = {
    country: string,
    param: string,
    thumbnail: string,
    hoverText: string,
    slideImg: {
        id: string
        name: string
        img: string
    }[],
    description: string,
    properties: string,
    timeZone: string,
    timeBehind: string,
    currency: string,
    exchange: string,
    bestTimeToVisit: string,
    city: {
        img: string;
        cityName: string;
        routePath: string;
    }[];
}

type props = {
    Ddata?: DestinationFormModel,
    preview: string
}

type LanguageOption = {
    value: string
    label: string
    imgPath: string
}

const { Control } = components

const destinationSchema = yup.object().shape({
    hoverText: yup.string().required(),
    param: yup.string().required(),
    country: yup.string().required(),
    slideImg: yup.array()
      .required('Hotel Images are required')
      .min(1, 'At least one slide image is required'),
    thumbnail: yup.string().required(),
    description: yup.string().required(),
    timeZone: yup.string().required(),
    properties: yup.string().required().matches(/^\d+$/, 'Properties must be a number'),
    timeBehind: yup.string().required(),
    currency: yup.string().required(),
    exchange: yup.string().required(),
    bestTimeToVisit: yup.string().required(),
    city: yup.array().of(
      yup.object().shape({
        img: yup.string(),
        cityName: yup.string().min(3,'required 3 letters'),
        routePath: yup.string(),
      })
    ),
  });

const langOptions: LanguageOption[] = [
    { value: 'en', label: 'English (US)', imgPath: '/img/countries/us.png' },
    { value: 'ch', label: '中文', imgPath: '/img/countries/cn.png' },
    { value: 'jp', label: '日本语', imgPath: '/img/countries/jp.png' },
    { value: 'fr', label: 'French', imgPath: '/img/countries/fr.png' },
]

const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<LanguageOption>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <Avatar shape="circle" size={20} src={data.imgPath} />
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({
    children,
    ...props
}: ControlProps<LanguageOption>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={18}
                    src={selected.imgPath}
                />
            )}
            {children}
        </Control>
    )
}

const Content = ( { preview }) => {
    const initialData = {
        country: '',
        param: '',
        thumbnail: '',
        hoverText: '',
        slideImg: [],
        description: '',
        properties: '',
        timeZone: '',
        timeBehind: '',
        currency: '',
        exchange: '',
        bestTimeToVisit: '',
        city: [{
            img: '',
            cityName: '',
            routePath: ''
        }]
    }

    const [ data , setData ] = useState(initialData)

    const onSetFormFile = (
        form: FormikProps<DestinationFormModel>,
        field: FieldInputProps<DestinationFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const id = location.pathname.split('/').pop();
    useEffect(() => {
        const fetch = async () => {
            const res = await dispatch(fetchDestinationById(id))
            let destination = res.payload;
            if(destination){
                setData(destination)
            }
        }
        fetch()
    },[dispatch, id])
    
    const onFormSubmit = async (
        values: DestinationFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: any
    ) => {
        try {
            setSubmitting(true);
            let response;
            preview === "save" ?
            response = await dispatch(postDestination(values)) 
            : response = await dispatch(putDestination({ id: id, values: values }))

            preview === "save" && resetForm();

            if(response.meta.requestStatus == 'fulfilled'){
                toast.push(<Notification title={'Destination updated'} type="success" />, {
                    placement: 'top-center',
                })
            }
        } catch (error) {
            console.error("Error posting destination:", error);
            toast.push(<Notification title={'Error! try again later.'} type="danger" />, {
                placement: 'top-center',
            })
        }
    
        setSubmitting(false)
    }

    const onDelete = async () => {
        dispatch(deleteDestination(id))
        toast.push(<Notification title={'Successfully deleted destination.'} type="success" />, {
            placement: 'top-center',
        })
        navigate('/cms/destinations')
    }

    return (
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={destinationSchema}
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
                                title="Country Info"
                                desc="Basic info, like your name and address that will displayed in public"
                            />
                            <FormRow
                                name="country"
                                label="Country Name"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="country"
                                    placeholder="Name"
                                    component={Input}
                                    prefix={
                                        <FcGlobe className="text-xl" />
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
                                    placeholder="/example"
                                    component={Input}
                                    prefix={
                                        <HiServer className="text-xl text-black" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="thumbnail"
                                label="Thumbnail"
                                {...validatorProps}
                            >
                                <Field name="thumbnail">
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
                                                    size={140}
                                                    shape="square"
                                                    icon={<FcAddImage />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow>

                            <FormRow
                                name="description"
                                label="Description"
                                {...validatorProps}
                            >
                                <Field name="description">
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
                                name="slideImg"
                                label="Country Images"
                                {...validatorProps}
                            >
                                <HotelImages values={values} />
                            </FormRow>

                            <FormRow
                                name="hoverText"
                                label="Hover text label"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="hoverText"
                                    placeholder="13 Hotel - 10 Tours - 70 Activity"
                                    component={Input}
                                    prefix={
                                        <HiPencil className="text-xl text-green-400" />
                                    }
                                />
                            </FormRow> 

                            <FormRow
                                name="currency"
                                label="Currency"
                                {...validatorProps}
                            >
                                <Field name="currency">
                                    {({ field, form }: FieldProps) => (
                                        <Select<LanguageOption>
                                            field={field}
                                            form={form}
                                            options={langOptions}
                                            components={{
                                                Option: CustomSelectOption,
                                                Control: CustomControl,
                                            }}
                                            value={langOptions.filter(
                                                (option) =>
                                                    option.value ===
                                                    values?.currency
                                            )}
                                            onChange={(option) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    option?.value
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormRow>
                            
                            <FormRow
                                name="exchange"
                                label="Exchange"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="exchange"
                                    placeholder="1 INR = 79 dollars"
                                    component={Input}
                                    prefix={
                                        <FcCurrencyExchange className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormRow
                                name="properties"
                                label="Properties in that Country"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="properties"
                                    placeholder="489"
                                    component={Input}
                                    prefix={
                                        <FcDepartment className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormRow
                                name="timeZone"
                                label="Time Zone"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="timeZone"
                                    placeholder="Time Zone"
                                    component={Input}
                                    prefix={
                                        <FcClock className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormRow
                                name="timeBehind"
                                label="Time Behind"
                                {...validatorProps}
                                >
                                <Field 
                                    name="timeBehind" 
                                    type="text"
                                    autoComplete="off"
                                    placeholder="1 hour ahead"
                                    component={Input} 
                                    prefix={
                                        <HiRewind className="text-xl text-red-400" />
                                    }
                                />
                            </FormRow> 
                           
                            <FormRow
                                name="bestTimeToVisit"
                                label="Best Time To Visit"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="bestTimeToVisit"
                                    placeholder="June"
                                    component={Input}
                                    prefix={
                                        <FcNightLandscape className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormRow name="" label="City" {...validatorProps}>
                            <FieldArray name="city">
                            {({ push, remove }) => (
                                <div>
                                {values.city.map((city, index) => (
                                    <div key={index} className='flex gap-2 mb-2 justify-center items-center'>
                                        <Field name={`city[${index}].img`}>
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
                                                            size={80}
                                                            shape="square"
                                                            icon={<FcAddImage />}
                                                            {...avatarProps}
                                                        />
                                                    </Upload>
                                                )
                                            }}
                                        </Field>
                                        
                                        <Field 
                                            name={`city[${index}].cityName`} placeholder="City Name" component={Input} prefix={
                                            <FcLibrary className="text-xl" />
                                            }
                                        />
                                
                                        <Field name={`city[${index}].routePath`} placeholder="/destinations/[city-name]" component={Input} prefix={
                                            <HiOutlineGlobeAlt className='text-xl text-blue-400' />
                                        }/>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                    >
                                        <HiOutlineMinusCircle size={22} className="rounded-full hover:bg-red-400 hover:text-white" />
                                    </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => push({ img: '', cityName: '', routePath: '' })}
                                    className='border rounded-2xl px-2 py-1 mt-2'
                                >
                                    <span className="flex items-center gap-2">
                                    <FcPlus />
                                    Add City
                                    </span>
                                </button>
                                </div>
                            )}
                            </FieldArray>
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

export default Content
