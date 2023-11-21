import * as Yup from 'yup'

import { AdaptableCard, RichTextEditor } from '@/components/shared'
import { FcAddImage, FcEditImage, FcFinePrint, FcFlowChart, FcKey, FcNews, FcRules } from "react-icons/fc";
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import {
    HiOutlineAtSymbol,
    HiOutlineGlobeAlt,
} from 'react-icons/hi'
import { editSeo, fetchAbout, useAppDispatch } from './store';

import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow';
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import Upload from '@/components/ui/Upload'
import toast from '@/components/ui/toast'

export type SeoFormModel = {
    id? : string;
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

type props = {
    data?: SeoFormModel,
    aboutId?: string,
}

const seoSchema = Yup.object().shape({
  pageTitle: Yup.string(),
  metaTitle: Yup.string(),
  metaDescription: Yup.string(),
  ogImage: Yup.string(),
  ogImageAlt: Yup.string(),
  twitterHandle: Yup.string(),
  canonicalUrl: Yup.string(),
  robotsContent: Yup.string(),
  keywords: Yup.string(),
  structuredDataScript: Yup.string(),
});

const Seo = ({ data, aboutId }: props) => {
    
    const initialData = {
        pageTitle: data?.pageTitle || '',
        metaTitle: data?.metaTitle || '',
        metaDescription: data?.metaDescription || '',
        ogImage: data?.ogImage || '',
        ogImageAlt: data?.ogImageAlt || '',
        twitterHandle: data?.twitterHandle || '',
        canonicalUrl: data?.canonicalUrl || '',
        robotsContent: data?.robotsContent || '',
        keywords: data?.keywords || '',
        structuredDataScript: data?.structuredDataScript || '',
    };
    
    const onSetFormFile = (
        form: FormikProps<SeoFormModel>,
        field: FieldInputProps<SeoFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }
    const dispatch = useAppDispatch();

    const onFormSubmit = async (
        values: SeoFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        try {
            setSubmitting(true);
            const response = await dispatch(editSeo({ id: aboutId, values: values }));
            if(response.meta.requestStatus == 'fulfilled'){
                dispatch(fetchAbout())
                toast.push(<Notification title={'About Seo updated'} type="success" />, {
                    placement: 'top-center',
                })
            }
        } catch (error) {
            console.error("Error posting seo page:", error);
            toast.push(<Notification title={'Error please try again later.'} type="danger" />, {
                placement: 'top-center',
            })
        }
        setSubmitting(false)
    }

    return ( 
        <AdaptableCard>
        <div className="max-w-[800px] mx-auto">
          
        <Formik
            enableReinitialize
            initialValues={initialData}
            validationSchema={seoSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
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
        
    </div>
    </AdaptableCard>
    )
}

export default Seo
