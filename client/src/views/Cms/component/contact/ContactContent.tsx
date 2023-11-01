import * as Yup from 'yup'

import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { FcAddressBook, FcCellPhone } from 'react-icons/fc'
import { Field, Form, Formik } from 'formik'
import type { FieldInputProps, FormikProps } from 'formik'
import { HiOutlineAtSymbol, HiOutlineUserCircle } from 'react-icons/hi'

import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

export type ContactFormModel = {
    address: string;
    phone: string;
    email: string;
    socialMediaLinks: {
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
    };
}

type props = {
    data?: ContactFormModel
}

const validationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    phone: Yup.number() .min(1000000000, 'Phone number must be exactly 10 numbers long')
    .max(9999999999, 'Phone number must be exactly 10 numbers long').required('Phone is required'),
    email: Yup.string().required('Email is required').email('Invalid email address'),
    socialMediaLinks: Yup.object().required('ksdjflk'),
  });
  
const ContactContent = ({
    data = {
        address: '',
        phone: '',
        email: '',
        socialMediaLinks: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
        }
    },
}: props) => {
    const onSetFormFile = (
        form: FormikProps<ContactFormModel>,
        field: FieldInputProps<ContactFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (
        values: ContactFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: any
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'Contact page updated'} type="success" />, {
            placement: 'top-center',
        })
        resetForm()
        setSubmitting(false)
    }


    return (
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={validationSchema}
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
                                title="Contact Page"
                                desc="Basic info for your contact page"
                            />
                           
                           <FormRow
                            name="address"
                            label="Address"
                            {...validatorProps}
                        >
                            <Field
                            type="text"
                            autoComplete="off"
                            name="address"
                            placeholder="Address"
                            component={Input}
                            prefix={
                                <FcAddressBook className="text-xl" />
                            }
                            />
                        </FormRow>

                        <FormRow
                            name="phone"
                            label="Phone"
                            {...validatorProps}
                        >
                            <Field
                            type="phone"
                            autoComplete="off"
                            name="phone"
                            placeholder="Phone"
                            component={Input}
                            prefix={
                                <FcCellPhone className="text-xl" />
                            }
                            />
                        </FormRow>

                        <FormRow
                            name="email"
                            label="Email"
                            {...validatorProps}
                        >
                            <Field
                            type="text"
                            autoComplete="off"
                            name="email"
                            placeholder="Email"
                            component={Input}
                            prefix={
                                <HiOutlineAtSymbol className="text-xl text-black" />
                            }
                            />
                        </FormRow>

                        <FormRow
                            name="socialMediaLinks"
                            label="Facebook link"
                            {...validatorProps}
                        >
                            <Field
                            type="text"
                            autoComplete="off"
                            name="socialMediaLinks.facebook"
                            placeholder="Facebook"
                            component={Input}
                            prefix={
                                <BsFacebook className="text-xl text-blue-500" />
                            }
                            />
                        </FormRow>
                        <FormRow
                            name="socialMediaLinks"
                            label="Twitter link"
                            {...validatorProps}
                        >
                            <Field
                            type="text"
                            autoComplete="off"
                            name="socialMediaLinks.twitter"
                            placeholder="Twitter"
                            component={Input}
                            prefix={
                                <BsTwitter className="text-xl text-blue-700" />
                            }
                            />
                        </FormRow>
                        <FormRow
                            name="socialMediaLinks"
                            label="Instagram link"
                            {...validatorProps}
                        >
                            <Field
                            type="text"
                            autoComplete="off"
                            name="socialMediaLinks.instagram"
                            placeholder="Instagram"
                            component={Input}
                            prefix={
                                <BsInstagram className="text-xl text-pink-500" />
                            }
                            />
                        </FormRow>
                        
                        <FormRow
                            name="socialMediaLinks"
                            label="Linkedin link"
                            {...validatorProps}
                        >
                            <Field
                            type="text"
                            autoComplete="off"
                            name="socialMediaLinks.linkedin"
                            placeholder="LinkedIn"
                            component={Input}
                            prefix={
                                <BsLinkedin className="text-xl text-blue-500" />
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


export default ContactContent