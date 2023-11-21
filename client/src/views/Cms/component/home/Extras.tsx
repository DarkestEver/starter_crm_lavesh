import * as Yup from 'yup'

import { AdaptableCard, RichTextEditor } from '@/components/shared'
import { Avatar, Upload } from '@/components/ui'
import { FcAdvance, FcBusinessman, FcRating } from 'react-icons/fc'
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import { HiOutlineGlobeAlt, HiPencil, HiPencilAlt, HiPhotograph } from 'react-icons/hi'
import { useAppDispatch } from '@/store'
import { editExtras, fetchHome } from './store'

import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'


export type ExtrasForm = {
    _id?: string;
    adBannerTitle: string;
    adBannerImage: string;
    adBannerMeta: string;
    adBannerRouterPath: string;
    adBannerDelayAnimation: string;
    testimonialRatingHeading: string;
    testimonialRatingDescription: string;
    testimonialRatingCustomersNumber: string; 
    testimonialRatingCustomersText: string; 
    testimonialRatingRatingNumber: string;
    testimonialRatingRatingText: string;
};

type props = {
    data?: ExtrasForm,
    homeId?: string,
}

const validationSchema = Yup.object().shape({
    adBannerTitle: Yup.string().required('Ad Banner Title is required'),
    adBannerImage: Yup.string().required('Ad Banner Image is required'),
    adBannerMeta: Yup.string().required('Ad Banner Meta is required'),
    adBannerRouterPath: Yup.string().required('Ad Banner Router Path is required'),
    adBannerDelayAnimation: Yup.string()
      .required('Ad Banner Delay Animation is required')
      .matches(/^\d+$/, 'Ad Banner Delay Animation must be a number'),
      
    testimonialRatingHeading: Yup.string().required('Testimonial Rating Heading is required'),
    testimonialRatingDescription: Yup.string().required('Testimonial Rating Description is required'),
    testimonialRatingCustomersNumber: Yup.string()
        .required('Testimonial Rating Customers Number is required')
        .matches(/^\d+$/, 'Rating Customers Number must be a number'),
    testimonialRatingCustomersText: Yup.string().required('Testimonial Rating Customers Text is required'),
    testimonialRatingRatingNumber: Yup.string()
        .required('Testimonial Rating Rating Number is required')
        .matches(/^\d+(\.\d+)?$/, 'Rating Number must be a number'),
    testimonialRatingRatingText: Yup.string().required('Testimonial Rating Rating Text is required'),
});

const Extras = ({ data, homeId }: props) => {
    const initialData = {
        adBannerTitle: data?.adBannerTitle || '',
        adBannerImage: data?.adBannerImage || '',
        adBannerMeta: data?.adBannerMeta || '',
        adBannerRouterPath: data?.adBannerRouterPath || '',
        adBannerDelayAnimation: data?.adBannerDelayAnimation || '',

        testimonialRatingHeading: data?.testimonialRatingHeading || '',
        testimonialRatingDescription: data?.testimonialRatingDescription || '',
        testimonialRatingCustomersNumber: data?.testimonialRatingCustomersNumber || '',
        testimonialRatingCustomersText: data?.testimonialRatingCustomersText || '',
        testimonialRatingRatingNumber: data?.testimonialRatingRatingNumber || '',
        testimonialRatingRatingText: data?.testimonialRatingRatingText || '',
    }
    const dispatch = useAppDispatch();
    
    const onSetFormFile = (
        form: FormikProps<ExtrasForm>,
        field: FieldInputProps<ExtrasForm>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = async (
        values: ExtrasForm,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try {
            setSubmitting(true);
            const response = await dispatch(editExtras({ id: homeId , values: values }));
            if(response.meta.requestStatus == 'fulfilled'){
                dispatch(fetchHome())
                toast.push(<Notification title={'Extras data updated'} type="success" />, {
                    placement: 'top-center',
                })
            }
        } catch (error) {
            console.error("Error posting Extras:", error);
            toast.push(<Notification title={'Error, try again later!'} type="danger" />, {
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
            validationSchema={validationSchema}
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
                                title="Add Banner"
                                desc="Basic info for your home page"
                            />
                           
                           <FormRow
                                name="adBannerTitle"
                                label="Title"
                                {...validatorProps}
                                border={false}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="adBannerTitle"
                                placeholder="Up to 70% Discount!"
                                component={Input}
                                prefix={
                                    <HiPencilAlt className='text-xl text-black' />
                                }
                            />
                            </FormRow>
                           

                            <FormRow
                                name="adBannerImage"
                                label="Image"
                                {...validatorProps}
                                border={false}
                            >
                                <Field name="adBannerImage">
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
                                                    size={100}
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
                                name="adBannerMeta"
                                label="Meta"
                                {...validatorProps}
                                border={false}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="adBannerMeta"
                                placeholder="Enjoy Summer Deals"
                                component={Input}
                                prefix={
                                    <HiPencil className='text-xl text-gray-400' />
                                }
                            />
                            </FormRow>

                            <FormRow
                                name="adBannerRouterPath"
                                label="RouterPath"
                                {...validatorProps}
                                border={false}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="adBannerRouterPath"
                                placeholder="Ad Banner RouterPath"
                                component={Input}
                                prefix={
                                    <HiOutlineGlobeAlt className='text-xl text-blue-400' />
                                }
                            />
                            </FormRow>

                            <FormRow
                                name="adBannerDelayAnimation"
                                label="Delay Animation"
                                {...validatorProps}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="adBannerDelayAnimation"
                                placeholder="Ad Banner Animation"
                                component={Input}
                                prefix={
                                    <FcAdvance className='text-xl' />
                                }
                            />
                            </FormRow>


                            <FormDesription
                                title="Testimonial Rating"
                                desc="Basic info for your home page"
                                className='mt-2'
                            />
                            <FormRow
                            name="testimonialRatingHeading"
                            label="Rating Heading"
                            {...validatorProps}
                            border={false}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="testimonialRatingHeading"
                                placeholder="What our customers are saying us?"
                                component={Input}
                                prefix={
                                    <HiPencilAlt className='text-xl text-black' />
                                }
                            />
                            </FormRow>
                          

                            <FormRow
                                name="testimonialRatingDescription"
                                label="Description"
                                {...validatorProps}
                                border={false}
                            >
                                <Field name="testimonialRatingDescription">
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
                                name="testimonialRatingCustomersNumber"
                                label="Number of Customers"
                            {...validatorProps}
                            border={false}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="testimonialRatingCustomersNumber"
                                placeholder="1000+"
                                component={Input}
                                prefix={
                                    <FcBusinessman className="text-xl" />
                                }
                            />
                            </FormRow>
                            <FormRow
                                name="testimonialRatingCustomersText"
                                label="Customers Text"
                            {...validatorProps}
                            border={false}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="testimonialRatingCustomersText"
                                placeholder="Happy Customers"
                                component={Input}
                                prefix={
                                    <HiPencil className="text-xl" />
                                }
                            />
                            </FormRow>
                            <FormRow
                                name="testimonialRatingRatingNumber"
                                label="Rating Number"
                            {...validatorProps}
                            border={false}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="testimonialRatingRatingNumber"
                                placeholder="4.9"
                                component={Input}
                                prefix={
                                    <FcRating className='text-xl' />
                                }
                            />
                            </FormRow>
                            <FormRow
                                name="testimonialRatingRatingText"
                                label="Rating Text"
                            {...validatorProps}
                            border={false}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="testimonialRatingRatingText"
                                placeholder="Overall rating"
                                component={Input}
                                prefix={
                                    <HiPencil className="text-xl text-black" />
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
                                    {isSubmitting ? 'Updating' : 'Edit'}
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


export default Extras