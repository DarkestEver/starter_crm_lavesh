import * as Yup from 'yup'

import { Avatar, Upload } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FieldProps, FormikProps } from 'formik'

import Button from '@/components/ui/Button'
import { FcAddImage } from 'react-icons/fc'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { z } from 'zod';

const blockContentSchema = z.object({
    icon: z.string(),
    title: z.string(),
    text: z.string(),
    delayAnimation: z.string(),
});

const validationSchema = z.object({
    blockContent1: z.array(blockContentSchema),
    blockContent2: blockContentSchema,
    blockContent3: blockContentSchema,
});


export type BlockGuideModel = {
    blockContent1: {
        icon: string;
        title: string;
        text: string;
        delayAnimation: string;
    }[],
    blockContent2: {
        icon: string;
        title: string;
        text: string;
        delayAnimation: string;
    },
    blockContent3: {
        icon: string;
        title: string;
        text: string;
        delayAnimation: string;
    },
}


type props = {
    data?: BlockGuideModel
}

// const validationSchema = Yup.object().shape({
//     blockContent1: Yup.array().of(
//         Yup.object().shape({
//             icon: Yup.string().required('Icon is required'),
//             title: Yup.string().required('Title is required'),
//             text: Yup.string().required('Text is required'),
//             delayAnimation: Yup.string().required('Delay Animation is required'),
//         })
//     ),
//     blockContent2: Yup.object().shape({
//         icon: Yup.string().required('Icon is required'),
//         title: Yup.string().required('Title is required'),
//         text: Yup.string().required('Text is required'),
//         delayAnimation: Yup.string().required('Delay Animation is required'),
//     }),
//     blockContent3: Yup.object().shape({
//         icon: Yup.string().required('Icon is required'),
//         title: Yup.string().required('Title is required'),
//         text: Yup.string().required('Text is required'),
//         delayAnimation: Yup.string().required('Delay Animation is required'),
//     }),
// });

const BlockGuide = ({
    data = {
        blockContent1: [{
            icon: "",
            title: "",
            text: "",
            delayAnimation: "",
        }],
        blockContent2: {
            icon: "",
            title: "",
            text: "",
            delayAnimation: "",
        },
        blockContent3: {
            icon: "",
            title: "",
            text: "",
            delayAnimation: "",
        },
    },
}: props) => {
    const onSetFormFile = (
        form: FormikProps<BlockGuideModel>,
        field: FieldInputProps<BlockGuideModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }


    const onFormSubmit = (
        values: BlockGuideModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'BlockGuide data updated'} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={data}
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
                                title="Block Guide"
                                desc="Basic info for block guide section"
                            />

                           <FormRow
                                name="blockContent1"
                                label="Icon"
                                {...validatorProps}
                            >
                                <Field name="blockContent1.icon">
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

                            {/* <FormRow name="blockContent1.title" label="Title" {...validatorProps}>
                                <Field
                                type="text"
                                autoComplete="off"
                                name="title"
                                placeholder="Best Price Guarantee"
                                component={Input}
                                />
                            </FormRow>

                            <FormRow name="blockContent1.text" label="Text" {...validatorProps}>
                                <Field
                                type="text"
                                autoComplete="off"
                                name="text"
                                placeholder="Experience the best rates, always."
                                component={Input}
                                />
                            </FormRow>

                            <FormRow name="blockContent1.delayAnimation" label="Delay Animation" {...validatorProps}>
                                <Field
                                type="text"
                                autoComplete="off"
                                name="delayAnimation"
                                placeholder="Animation Delay (100,200,300,400)"
                                component={Input}
                                />
                            </FormRow> */}

        <FormRow name="blockContent1" label="Title" {...validatorProps}>
            <Field
                type="text"
                autoComplete="off"
                name="blockContent1.title"  // Update the name to match your structure
                placeholder="Best Price Guarantee"
                component={Input}
            />
        </FormRow>

        <FormRow name="blockContent1" label="Text" {...validatorProps}>
            <Field
                type="text"
                autoComplete="off"
                name="blockContent1.text"  // Update the name to match your structure
                placeholder="Experience the best rates, always."
                component={Input}
            />
        </FormRow>

        <FormRow name="blockContent1" label="Delay Animation" {...validatorProps}>
            <Field
                type="text"
                autoComplete="off"
                name="blockContent1.delayAnimation"  // Update the name to match your structure
                placeholder="Animation Delay (100,200,300,400)"
                component={Input}
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




export default BlockGuide