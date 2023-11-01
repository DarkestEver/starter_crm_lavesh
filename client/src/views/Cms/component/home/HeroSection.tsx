import * as Yup from 'yup'

import { FcPlus, FcTreeStructure } from 'react-icons/fc'
import { Field, FieldArray, Form, Formik } from 'formik'
import type { FieldInputProps, FormikProps } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import { HiOutlineGlobeAlt, HiOutlineMinusCircle, HiOutlineUserCircle } from 'react-icons/hi'

import Button from '@/components/ui/Button'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

export type HomeFormModel = {
    heroSection: {
        heading: string;
        subheading: string;
    };
    mainFilterSearchBox: {
        location: {
          title: string;
          placeholder: string;
        };
        date: {
          title: string;
          placeholder: string;
        };
        guests: {
          title: string;
          placeholder: string;
          guestTypes: {
              name: string;
              defaultValue: string;
            }[]
        };
        email: {
          title: string;
          placeholder: string;
        };
        phone: {
          title: string;
          placeholder: string;
        };
    };
}

type props = {
    data?: HomeFormModel
}


const validationSchema = Yup.object().shape({
  heroSection: Yup.object().shape({
    heading: Yup.string().required('Hero Section Heading is required'),
    subheading: Yup.string().required('Hero Section Subheading is required'),
  }),
  mainFilterSearchBox: Yup.object().shape({
    location: Yup.object().shape({
      title: Yup.string().required('Location Title is required'),
      placeholder: Yup.string().required('Location Placeholder is required'),
    }),
    date: Yup.object().shape({
      title: Yup.string().required('Date Title is required'),
      placeholder: Yup.string().required('Date Placeholder is required'),
    }),
    guests: Yup.object().shape({
      title: Yup.string().required('Guests Title is required'),
      placeholder: Yup.string().required('Guests Placeholder is required'),
      guestTypes: Yup.object().shape({
        name: Yup.string().required('Guest Name is required'),
        defaultValue: Yup.string().required('Guest Default Value is required'),
      }),
    }),
    email: Yup.object().shape({
      title: Yup.string().required('Email Title is required'),
      placeholder: Yup.string().required('Email Placeholder is required'),
    }),
    phone: Yup.object().shape({
      title: Yup.string().required('Phone Title is required'),
      placeholder: Yup.string().required('Phone Placeholder is required'),
    }),
  }),
});



const HeroSection = ({
    data = {
        heroSection: {
          heading: '',
          subheading: '',
        },
        mainFilterSearchBox: {
          location: {
            title: '',
            placeholder: '',
          },
          date: {
            title: '',
            placeholder: '',
          },
          guests: {
            title: '',
            placeholder: '',
            guestTypes: [{
              name: '',
              defaultValue: '',
            }],
          },
          email: {
            title: '',
            placeholder: '',
          },
          phone: {
            title: '',
            placeholder: '',
          },
        },
    }    
}: props) => {
    const onSetFormFile = (
        form: FormikProps<HomeFormModel>,
        field: FieldInputProps<HomeFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (
        values: HomeFormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'Hero Section updated'} type="success" />, {
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
                                title="Home Page"
                                desc="Basic info for your home page"
                            />
                           
                           <FormRow name="heroSection" label="Hero Section" {...validatorProps}>
                                <Field
                                type="text"
                                autoComplete="off"
                                name="heroSection.heading"
                                placeholder="Find Next Place To Visit"
                                component={Input}
                                className="mb-2"
                                />
                                
                                <Field
                                type="text"
                                autoComplete="off"
                                name="heroSection.subheading"
                                placeholder="Discover amzaing places at exclusive deals"
                                component={Input}
                                />
                            </FormRow>

                            <FormRow
                                name="mainFilterSearchBox"
                                label="Main Filter Search Box"
                                {...validatorProps}
                            >
                                <FormRow
                                name="location"
                                label="Location"
                                {...validatorProps}
                                >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="mainFilterSearchBox.location.title"
                                    placeholder="Location"
                                    component={Input}
                                    className="mb-2"
                                />
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="mainFilterSearchBox.location.placeholder"
                                    placeholder="Where are you going?"
                                    component={Input}
                                    
                                />
                                </FormRow>

                                <FormRow name="date" label="Date" {...validatorProps}>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="mainFilterSearchBox.date.title"
                                    placeholder="Date"
                                    component={Input}
                                    className="mb-2"
                                />
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="mainFilterSearchBox.date.placeholder"
                                    placeholder="03-12-23"
                                    component={Input}
                                />
                                </FormRow>

                                <FormRow name="guests" label="Guests" {...validatorProps}>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="mainFilterSearchBox.guests.title"
                                    placeholder="Guests"
                                    component={Input}
                                    className="mb-2"
                                />
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="mainFilterSearchBox.guests.placeholder"
                                    placeholder="Adults - 0"
                                    component={Input}
                                    className="mb-4"
                                />
                                
                                <FormItem name="guestTypes" label="Guest Types" {...validatorProps} border={false}>
                                    <FieldArray name="mainFilterSearchBox.guests.guestTypes">
                                    {({ push, remove }) => (
                                        <>
                                        {values.mainFilterSearchBox.guests.guestTypes.map((guestType, index) => (
                                            <div key={index} className="flex justify-between gap-4 mb-2">
                                            <div>
                                                <FormItem
                                                name={`mainFilterSearchBox.guests.guestTypes[${index}].name`}
                                                label="Name"
                                                {...validatorProps}
                                                >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name={`mainFilterSearchBox.guests.guestTypes[${index}].name`}
                                                    placeholder="adults"
                                                    component={Input}
                                                    prefix={<FcTreeStructure className="text-xl" />}
                                                />
                                                </FormItem>
                                            </div>
                                            <div>
                                                <FormItem
                                                name={`mainFilterSearchBox.guests.guestTypes[${index}].defaultValue`}
                                                label="Default Value"
                                                {...validatorProps}
                                                >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name={`mainFilterSearchBox.guests.guestTypes[${index}].defaultValue`}
                                                    placeholder="0"
                                                    component={Input}
                                                    prefix={<HiOutlineGlobeAlt className="text-xl text-blue-500" />}
                                                />
                                                </FormItem>
                                            </div>
                                            <button type="button" onClick={() => remove(index)}>
                                                <HiOutlineMinusCircle size={22} className="rounded-full hover:bg-red-400 hover:text-white" />
                                            </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push({ name: '', defaultValue: '' })}
                                            className="border rounded-2xl px-2 py-1"
                                        >
                                            <span className="flex items-center gap-2">
                                            <FcPlus />
                                            Add Guest Type
                                            </span>
                                        </button>
                                        </>
                                    )}
                                    </FieldArray>
                                </FormItem>
                                
                                </FormRow>
                                <FormRow name="email" label="Email" {...validatorProps}>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="mainFilterSearchBox.email.title"
                                    placeholder="Email"
                                    component={Input}
                                    className="mb-2"
                                />
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="mainFilterSearchBox.email.placeholder"
                                    placeholder="abc@gmail.com"
                                    component={Input}
                                />
                                </FormRow>
                                <FormRow name="phone" label="Phone" {...validatorProps} border={false}>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="mainFilterSearchBox.phone.title"
                                    placeholder="Phone"
                                    component={Input}
                                    className="mb-2"
                                />
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="mainFilterSearchBox.phone.placeholder"
                                    placeholder="+91-XXXXXXXXXX"
                                    component={Input}
                                />
                                </FormRow>
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


export default HeroSection