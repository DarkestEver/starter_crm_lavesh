import * as yup from 'yup'

import { Avatar, Upload } from '@/components/ui'
import { FcAddImage, FcAdvance } from 'react-icons/fc'
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'
import { HiPencil, HiPencilAlt } from 'react-icons/hi'
import { fetchBlockGuide, putBlockGuide, useAppDispatch } from './store'

import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

export type BlockGuideModel = {
    icon: string;
    title: string;
    text: string;
    delayAnimation: string;
}

type props = {
    data?: BlockGuideModel
}

const blockGuideSchema = yup.object().shape({    
    icon: yup.string().required('Icon is required'),
    title: yup.string().required('Title is required'),
    text: yup.string().required('Text is required'),
    delayAnimation: yup.string().required('Delay Animation is required'),
});

const BlockGuide = ({ blockGuideData }: props) => {
    const dispatch = useAppDispatch();
    const initialData = {
        icon: blockGuideData.icon,
        title: blockGuideData.title,
        text: blockGuideData.text,
        delayAnimation: blockGuideData.delayAnimation,
    }
    const onSetFormFile = (
        form: FormikProps<BlockGuideModel>,
        field: FieldInputProps<BlockGuideModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = async (
        values: BlockGuideModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try {
            setSubmitting(true);
            const response = await dispatch(putBlockGuide({ ...values, _id: blockGuideData._id }));
            if(response.meta.requestStatus == 'fulfilled'){
                dispatch(fetchBlockGuide())
                toast.push(<Notification title={'Block Guide data updated'} type="success" />, {
                    placement: 'top-center',
                })
            }
        } catch (error) {
            console.error("Error posting Extras:", error);
            toast.push(<Notification title={'Error please try  again later.'} type="danger" />, {
                placement: 'top-center',
            })
        }
        setSubmitting(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialData}
            validationSchema={blockGuideSchema}
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
                                title="Block Guide"
                                desc="Basic info for block guide section"
                            />

                           <FormRow
                                name="icon"
                                label="Icon"
                                {...validatorProps}
                            >
                                <Field name="icon">
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
                                                    icon={<FcAddImage />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow>

                            <FormRow name="title" label="Title" {...validatorProps}>
                                <Field
                                type="text"
                                autoComplete="off"
                                name="title"
                                placeholder="Best Price Guarantee"
                                component={Input}
                                prefix={
                                    <HiPencilAlt className='text-xl text-black' />
                                }
                                />
                            </FormRow>

                            <FormRow name="text" label="Text" {...validatorProps}>
                                <Field
                                type="text"
                                autoComplete="off"
                                name="text"
                                placeholder="Experience the best rates, always."
                                component={Input}
                                prefix={
                                    <HiPencil className='text-xl text-gray-400' />
                                }
                                />
                            </FormRow>

                            <FormRow name="delayAnimation" label="Delay Animation" {...validatorProps}>
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
    )
}




export default BlockGuide