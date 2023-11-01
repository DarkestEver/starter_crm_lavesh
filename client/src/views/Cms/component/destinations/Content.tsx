import * as Yup from 'yup'

import type { ControlProps, OptionProps } from 'react-select'
import { FcClock, FcCurrencyExchange, FcGlobe, FcMoneyTransfer, FcNightLandscape } from 'react-icons/fc'
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import {
    HiCheck,
    HiClock,
    HiOutlineCurrencyRupee,
    HiOutlineLocationMarker,
    HiOutlineUser,
    HiPaperAirplane,
    HiPencil,
    HiRewind,
    HiServer,
} from 'react-icons/hi'

import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import HotelImages from '../hotels/HotelImages'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import { RichTextEditor } from '@/components/shared'
import Select from '@/components/ui/Select'
import Upload from '@/components/ui/Upload'
import { components } from 'react-select'
import toast from '@/components/ui/toast'

export type ContentFormModel = {
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

type ProfileProps = {
    data?: ContentFormModel
}

type LanguageOption = {
    value: string
    label: string
    imgPath: string
}

const { Control } = components

const destinationSchema = Yup.object().shape({
    hoverText: Yup.string().required(),
    param: Yup.string().required(),
    country: Yup.string().required(),
    slideImg: Yup.array()
      .required('Hotel Images are required')
      .min(1, 'At least one slide image is required'),
    thumbnail: Yup.string().required(),
    description: Yup.string().required(),
    timeZone: Yup.string().required(),
    timeBehind: Yup.string().required(),
    currency: Yup.string().required(),
    exchange: Yup.string().required(),
    bestTimeToVisit: Yup.string().required(),
    // city: Yup.array().of(
    //   Yup.object().shape({
    //     img: Yup.string().required(),
    //     cityName: Yup.string().required(),
    //     routePath: Yup.string().required(),
    //   })
    // ),
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

const Content = ({
    data = {
        country: '',
        param: '',
        thumbnail: '',
        hoverText: '',
        slideImg: [],
        description: '',
        timeZone: '',
        timeBehind: '',
        currency: '',
        exchange: '',
        bestTimeToVisit: '',
        city: []
    },
}: ProfileProps) => {
    const onSetFormFile = (
        form: FormikProps<ContentFormModel>,
        field: FieldInputProps<ContentFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (
        values: ContentFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: any
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'Profile updated'} type="success" />, {
            placement: 'top-center',
        })
        resetForm()
        setSubmitting(false)
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
                                        <HiServer className="text-xl" />
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
                                                    icon={<HiOutlineUser />}
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
                                        <HiPencil className="text-xl" />
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
                                        <HiRewind className="text-xl" />
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


                            {/* <FormRow
                                name="img"
                                label="City image"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="img"
                                    placeholder=""
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow> */}
                            
                            {/* <FormRow
                                name="cityName"
                                label="City Name"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="cityName"
                                    placeholder="istanbul"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormRow
                                name="routePath"
                                label="slug"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="routePath"
                                    placeholder="/example"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow> */}


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

export default Content
