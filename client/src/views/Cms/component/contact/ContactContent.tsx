import * as yup from 'yup'

import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { FcAddressBook, FcCellPhone } from 'react-icons/fc'
import { Field, Form, Formik } from 'formik'
import { fetchContact, putContact, useAppDispatch } from './store'

import { AdaptableCard } from '@/components/shared'
import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import { HiOutlineAtSymbol } from 'react-icons/hi'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

export type ContactFormModel = {
    address: string;
    phone: string;
    email: string;
    socialMediaLinksFacebook: string;
    socialMediaLinksTwitter: string;
    socialMediaLinksInstagram: string;
    socialMediaLinksLinkedin: string;
}

type props = {
    daa?: ContactFormModel,
}

const contactSchema = yup.object().shape({
    address: yup.string().required('Address is required'),
    phone: yup.number() .min(1000000000, 'Phone number must be exactly 10 numbers long')
    .max(9999999999, 'Phone number must be exactly 10 numbers long').required('Phone is required'),
    email: yup.string().required('Email is required').email('Invalid email address'),
    socialMediaLinksFacebook: yup.string(),
    socialMediaLinksTwitter: yup.string(),
    socialMediaLinksInstagram: yup.string(),
    socialMediaLinksLinkedin: yup.string(),
  });
  
const ContactContent = ({ data }: props) => {
    const dispatch = useAppDispatch();
    const initialData = {
        address: data?.address,
        email: data?.email,
        phone: data?.phone,
        socialMediaLinksFacebook: data?.socialMediaLinksFacebook,
        socialMediaLinksTwitter: data?.socialMediaLinksTwitter,
        socialMediaLinksInstagram: data?.socialMediaLinksInstagram,
        socialMediaLinksLinkedin: data?.socialMediaLinksLinkedin

    }
    const onFormSubmit = async (
        values: ContactFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        try {
            setSubmitting(true);
            const response = await dispatch(putContact({ ...values, _id: data._id }));
            if(response.meta.requestStatus == 'fulfilled'){
                dispatch(fetchContact())
                toast.push(<Notification title={'Contact page updated'} type="success" />, {
                    placement: 'top-center',
                })
            }
        } catch (error) {
            console.error("Error posting contact:", error);
            toast.push(<Notification title={'Error, try again later'} type="danger" />, {
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
            validationSchema={contactSchema}
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
                            name="socialMediaLinksFacebook"
                            label="Facebook link"
                            {...validatorProps}
                        >
                            <Field
                            type="text"
                            autoComplete="off"
                            name="socialMediaLinksFacebook"
                            placeholder="Facebook"
                            component={Input}
                            prefix={
                                <BsFacebook className="text-xl text-blue-500" />
                            }
                            />
                        </FormRow>
                        <FormRow
                            name="socialMediaLinksTwitter"
                            label="Twitter link"
                            {...validatorProps}
                        >
                            <Field
                            type="text"
                            autoComplete="off"
                            name="socialMediaLinksTwitter"
                            placeholder="Twitter"
                            component={Input}
                            prefix={
                                <BsTwitter className="text-xl text-blue-700" />
                            }
                            />
                        </FormRow>
                        <FormRow
                            name="socialMediaLinksInstagram"
                            label="Instagram link"
                            {...validatorProps}
                        >
                            <Field
                            type="text"
                            autoComplete="off"
                            name="socialMediaLinksInstagram"
                            placeholder="Instagram"
                            component={Input}
                            prefix={
                                <BsInstagram className="text-xl text-pink-500" />
                            }
                            />
                        </FormRow>
                        
                        <FormRow
                            name="socialMediaLinksLinkedin"
                            label="Linkedin link"
                            {...validatorProps}
                        >
                            <Field
                            type="text"
                            autoComplete="off"
                            name="socialMediaLinksLinkedin"
                            placeholder="LinkedIn"
                            component={Input}
                            prefix={
                                <BsLinkedin className="text-xl text-blue-500" />
                            }
                            />
                        </FormRow>
                           
                            <div className="mt-4 ltr:text-right">
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


export default ContactContent