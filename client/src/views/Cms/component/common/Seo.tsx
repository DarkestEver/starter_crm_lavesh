import * as Yup from 'yup'

import { AdaptableCard, RichTextEditor } from '@/components/shared'
import type { ControlProps, OptionProps } from 'react-select'
import { FcAddImage, FcEditImage, FcFinePrint, FcFlowChart, FcKey, FcNews, FcRules } from "react-icons/fc";
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import {
    HiCheck,
    HiOutlineAtSymbol,
    HiOutlineGlobeAlt,
    HiOutlineUser,
} from 'react-icons/hi'

import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from './FormDescription'
import FormRow from './FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import Upload from '@/components/ui/Upload'
import { components } from 'react-select'
import toast from '@/components/ui/toast'

export type SeoFormModel = {
    pageTitle: string;
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    ogImageAlt: string;
    twitterHandle: string;
    canonicalUrl: string;
    robotsContent: string;
    keywords: string;
    structuredDataScript: string;
}

type ProfileProps = {
    data?: SeoFormModel
}

type LanguageOption = {
    value: string
    label: string
    imgPath: string
}

const { Control } = components

const seoSchema = Yup.object().shape({
  pageTitle: Yup.string().required('Page title is required'),
  metaTitle: Yup.string().required('Meta title is required'),
  metaDescription: Yup.string().required('Meta description is required'),
  ogImage: Yup.string().required('Open Graph image is required'),
  ogImageAlt: Yup.string().required('Open Graph image alt text is required'),
  twitterHandle: Yup.string().required('Twitter handle is required'),
  canonicalUrl: Yup.string().required('Canonical URL is required'),
  robotsContent: Yup.string().required('Robots content is required'),
  keywords: Yup.string().required('Keywords are required'),
  structuredDataScript: Yup.string().required('Structured data script is required'),
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

const Seo = ({
    data = {
        pageTitle: '',
        metaTitle: '',
        metaDescription: '',
        ogImage: '',
        ogImageAlt: '',
        twitterHandle: '',
        canonicalUrl: '',
        robotsContent: '',
        keywords: '',
        structuredDataScript: '',
    },
}: ProfileProps) => {
    const onSetFormFile = (
        form: FormikProps<SeoFormModel>,
        field: FieldInputProps<SeoFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (
        values: SeoFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: any
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'Seo data updated'} type="success" />, {
            placement: 'top-center',
        })
        // resetForm()
        setSubmitting(false)
    }

    return ( 
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={seoSchema}
            onSubmit={(values, { setSubmitting ,resetForm }) => {
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
                                title="Seo Info"
                                desc="Basic info for your page to make it seo optimised"
                            />
                            <FormRow
                                name="pageTitle"
                                label="Page Title"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="pageTitle"
                                    placeholder=""
                                    component={Input}
                                    prefix={
                                        <FcNews className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="metaTitle"
                                label="Meta Title"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="metaTitle"
                                    placeholder=""
                                    component={Input}
                                    prefix={
                                        <FcRules className="text-xl" />
                                    }
                                />
                            </FormRow>
                           
                            <FormRow
                                name="metaDescription"
                                label="Meta Description"
                                {...validatorProps}
                            >
                                <Field name="metaDescription">
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
                                name="keywords"
                                label="Keywords"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="keywords"
                                    placeholder=""
                                    component={Input}
                                    prefix={
                                        <FcKey className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormDesription
                                title="Facebook Opengraph"
                                desc="Basic info for your page to make it seo optimised"
                                className='mt-4'
                            />
                            <FormRow
                                name="ogImage"
                                label="Image"
                                {...validatorProps}
                            >
                                <Field name="ogImage">
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
                                                    size={110}
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
                                name="ogImageAlt"
                                label="Image alt"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="ogImageAlt"
                                    placeholder=""
                                    component={Input}
                                    prefix={
                                        <FcEditImage className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormDesription
                                title="Twitter Card"
                                desc="Basic info for your page to make it seo optimised"
                                className='mt-3'
                            />
                            <FormRow
                                name="twitterHandle"
                                label="Twitter Handle"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="twitterHandle"
                                    placeholder="john"
                                    component={Input}
                                    prefix={
                                        <HiOutlineAtSymbol className="text-xl text-black" />
                                    }
                                />
                            </FormRow>

                            <FormDesription
                                title="Extra Info"
                                desc="Basic info for your page to make it seo optimised"
                                className='mt-3'
                            />

                            <FormRow
                                name="canonicalUrl"
                                label="Canonical Url"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="canonicalUrl"
                                    placeholder="https://example.com"
                                    component={Input}
                                    prefix={
                                        <HiOutlineGlobeAlt className="text-xl text-blue-500" />
                                    }
                                />
                            </FormRow>

                            <FormRow
                                name="robotsContent"
                                label="Robots Content"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="robotsContent"
                                    placeholder="index,follow"
                                    component={Input}
                                    prefix={
                                        <FcFinePrint className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <FormRow
                                name="structuredDataScript"
                                label="Structured Data"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="structuredDataScript"
                                    placeholder=""
                                    component={Input}
                                    prefix={
                                        <FcFlowChart className="text-xl" />
                                    }
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

export default Seo
