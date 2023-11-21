import * as yup from 'yup'

import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import { FormContainer, FormItem } from '@/components/ui/Form'
import { HiLink, HiLocationMarker, HiOutlineAtSymbol, HiOutlineClock, HiOutlineMinusCircle, HiOutlinePhone, HiOutlineUserGroup, HiOutlineUsers, HiPencil, HiPencilAlt } from 'react-icons/hi'
import { editHeroSection, fetchHome, useAppDispatch } from './store'

import { AdaptableCard } from '@/components/shared'
import Button from '@/components/ui/Button'
import { FcPlus } from 'react-icons/fc'
import FormDesription from '../common/FormDescription'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

export type HeroSectionForm = {
    _id?: string;
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
    data?: HeroSectionForm,
    homeId?: string
}

const heroSectionSchema = yup.object().shape({
  heroSection: yup.object().shape({
    heading: yup.string().required('Hero Section Heading is required'),
    subheading: yup.string().required('Hero Section Subheading is required'),
  }),
  mainFilterSearchBox: yup.object().shape({
    location: yup.object().shape({
      title: yup.string().required('Title is required'),
      placeholder: yup.string().required('Placeholder is required'),
    }),
    date: yup.object().shape({
      title: yup.string().required('Date Title is required'),
      placeholder: yup.string().required('Date Placeholder is required'),
    }),
    guests: yup.object().shape({
      title: yup.string().required('Guests Title is required'),
      placeholder: yup.string().required('Guests Placeholder is required'),
      guestTypes: yup.array()
      .of(
        yup.object().shape({
        name: yup.string().required('*'),
        defaultValue: yup.number().required('*').typeError('Default Value must be a number'),    
      })
      ),
    }),
    email: yup.object().shape({
      title: yup.string().required('Email Title is required'),
      placeholder: yup.string().required('Email Placeholder is required'),
    }),
    phone: yup.object().shape({
      title: yup.string().required('Phone Title is required'),
      placeholder: yup.string().required('Phone Placeholder is required'),
    }),
  }),
});

const HeroSection = ({ data, homeId }: props) => {
    const dispatch = useAppDispatch();
    const initialData = {
        heroSection: {
          heading: data?.heroSection.heading || '',
          subheading: data?.heroSection.subheading || '',
        },
        mainFilterSearchBox: {
          location: {
            title: data?.mainFilterSearchBox.location.title || '',
            placeholder: data?.mainFilterSearchBox.location.placeholder || '',
          },
          date: {
            title: data?.mainFilterSearchBox.date.title || '',
            placeholder: data?.mainFilterSearchBox.date.placeholder || '',
          },
          guests: {
            title: data?.mainFilterSearchBox.guests.title || '',
            placeholder: data?.mainFilterSearchBox.guests.placeholder || '',
            guestTypes: data?.mainFilterSearchBox.guests.guestTypes.map(guestType => ({
                name: guestType.name || '',
                defaultValue: guestType.defaultValue || '',
              })) || [
                {
                  name: '',
                  defaultValue: '',
                },
              ],
          },
          email: {
            title: data?.mainFilterSearchBox.email.title || '',
            placeholder: data?.mainFilterSearchBox.email.placeholder || '',
          },
          phone: {
            title: data?.mainFilterSearchBox.phone.title || '',
            placeholder: data?.mainFilterSearchBox.phone.placeholder || '',
          },
        },
      };

    const onFormSubmit = async (
        values: HeroSectionForm,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try {
            setSubmitting(true);
            const response = await dispatch(editHeroSection({ id: homeId , values: values }));

            if(response.meta.requestStatus == 'fulfilled'){
                dispatch(fetchHome())
                toast.push(<Notification title={'Hero Section updated'} type="success" />, {
                    placement: 'top-center',
                })
            }
        } catch (error) {
            console.error("Error posting HeroSection:", error);
            toast.push(<Notification title={'Error please try  again later.'} type="danger" />, {
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
            validationSchema={heroSectionSchema}
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
                                title="Hero Section"
                                desc="Basic info for your home page"
                                className='mb-4'
                            />

                        <FormItem
                            label="Heading"
                            invalid={(errors.heroSection?.heading && touched.heroSection?.heading) as boolean}
                            errorMessage={errors.heroSection?.heading}
                        >
                            <Field
                            type="text"
                            autoComplete="off"
                            name="heroSection.heading"
                            placeholder="Find Next Place To Visit"
                            component={Input}
                            prefix={
                                <HiPencilAlt className='text-xl text-black' />
                            }
                            />
                        </FormItem>

                        <FormItem
                            label="Subheading"
                            invalid={(errors.heroSection?.subheading && touched.heroSection?.subheading) as boolean}
                            errorMessage={errors.heroSection?.subheading}
                        >
                            <Field
                            type="text"
                            autoComplete="off"
                            name="heroSection.subheading"
                            placeholder="Discover amzaing places at exclusive deals"
                            component={Input}
                            prefix={
                                <HiPencil className='text-xl text-black' />
                            }
                            />
                        </FormItem>
                    

                        {/* Main Filter Search Box Section */}
                        
                        <FormDesription
                            title="Main Filter Search Box"
                            desc="Basic info for home page"
                            className='mt-12 mb-4'
                        />
                        <FormDesription
                            title="Location"
                            desc=""
                        />
                        <div className='flex gap-4'>
                            <FormItem
                            className='w-1/2'
                            label="Title"
                            invalid={(errors.mainFilterSearchBox?.location?.title && touched.mainFilterSearchBox?.location?.title) as boolean}
                            errorMessage={errors.mainFilterSearchBox?.location?.title}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="mainFilterSearchBox.location.title"
                                placeholder="Location"
                                component={Input}
                                prefix={
                                    <HiLocationMarker className='text-xl text-red-400' />
                                }
                            />
                            </FormItem>

                            <FormItem
                            className='w-1/2'
                            label="Where are you going?"
                            invalid={(errors.mainFilterSearchBox?.location?.placeholder && touched.mainFilterSearchBox?.location?.placeholder) as boolean}
                            errorMessage={errors.mainFilterSearchBox?.location?.placeholder}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="mainFilterSearchBox.location.placeholder"
                                placeholder="Location Placeholder"
                                component={Input}
                                prefix={
                                    <HiLink className='text-xl text-red-400' />
                                }
                            />
                            </FormItem>   
                        </div>


                        {/* Date */}
                        <FormDesription
                            title="Date"
                            desc=""
                        />
                        <div className='flex gap-4 w-auto'>
                            <FormItem
                            className='w-1/2'
                            label="Title"
                            invalid={(errors.mainFilterSearchBox?.date?.title && touched.mainFilterSearchBox?.date?.title) as boolean}
                            errorMessage={errors.mainFilterSearchBox?.date?.title}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="mainFilterSearchBox.date.title"
                                placeholder="Date Title"
                                component={Input}
                                prefix={
                                    <HiOutlineClock className='text-xl text-blue-400' />
                                }
                            />
                            </FormItem>

                            <FormItem
                            className='w-1/2'
                            label="Placeholder"
                            invalid={(errors.mainFilterSearchBox?.date?.placeholder && touched.mainFilterSearchBox?.date?.placeholder) as boolean}
                            errorMessage={errors.mainFilterSearchBox?.date?.placeholder}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="mainFilterSearchBox.date.placeholder"
                                placeholder="Date Placeholder"
                                component={Input}
                                prefix={
                                    <HiLink className='text-xl text-blue-400' />
                                }
                            />
                            </FormItem>   
                        </div>


                        {/* Guests */}
                        <FormDesription
                            title="Guests"
                            desc=""
                        />
                        <div className='flex gap-4 w-auto'>
                            <FormItem
                            className='w-1/2'
                            label="Title"
                            invalid={(errors.mainFilterSearchBox?.guests?.title && touched.mainFilterSearchBox?.guests?.title) as boolean}
                            errorMessage={errors.mainFilterSearchBox?.guests?.title}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="mainFilterSearchBox.guests.title"
                                placeholder="Guests Title"
                                component={Input}
                                prefix={
                                    <HiOutlineUserGroup className='text-xl text-green-400' />
                                }
                            />
                            </FormItem>

                            <FormItem
                            className='w-1/2'
                            label="Placeholder"
                            invalid={(errors.mainFilterSearchBox?.guests?.placeholder && touched.mainFilterSearchBox?.guests?.placeholder) as boolean}
                            errorMessage={errors.mainFilterSearchBox?.guests?.placeholder}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="mainFilterSearchBox.guests.placeholder"
                                placeholder="Guests Placeholder"
                                component={Input}
                                prefix={
                                    <HiLink className='text-xl text-green-400' />
                                }
                            />
                            </FormItem>   
                        </div>

            <div className='mb-4'>
            <FormDesription
                title="GuestTypes"
                desc=""
            />
          <FieldArray name="mainFilterSearchBox.guests.guestTypes">
            {({ push, remove }) => (
              <div className=''>
                {values.mainFilterSearchBox.guests.guestTypes.map((guestType, index) => (
                  <div key={index} className='flex gap-2 mb-2'>
                    <Field name={`mainFilterSearchBox.guests.guestTypes[${index}].name`} placeholder="adults" component={Input} prefix={<HiOutlineUsers className='text-xl text-green-400' />} />
                    <ErrorMessage name={`mainFilterSearchBox.guests.guestTypes[${index}].name`} />
                    <Field name={`mainFilterSearchBox.guests.guestTypes[${index}].defaultValue`} placeholder="0" component={Input} prefix={<HiLink className='text-xl text-green-400' />}/>
                    <ErrorMessage name={`mainFilterSearchBox.guests.guestTypes[${index}].defaultValue`} />
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
                  onClick={() => push({ name: '', defaultValue: '' })}
                  className='border rounded-2xl px-2 py-1 mt-2'
                >
                  <span className="flex items-center gap-2">
                            <FcPlus />
                            Add guest type
                          </span>
                </button>
              </div>
            )}
          </FieldArray>
          </div>


                        {/* Email */}
                        <FormDesription
                            title="Email"
                            desc=""
                        />
                        <div className='flex gap-4 w-auto'>
                            <FormItem
                            className='w-1/2'
                            label="Title"
                            invalid={(errors.mainFilterSearchBox?.email?.title && touched.mainFilterSearchBox?.email?.title) as boolean}
                            errorMessage={errors.mainFilterSearchBox?.email?.title}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="mainFilterSearchBox.email.title"
                                placeholder="Email"
                                component={Input}
                                prefix={
                                    <HiOutlineAtSymbol className='text-xl text-brown-400' />
                                }
                            />
                            </FormItem>

                            <FormItem
                            className='w-1/2'
                            label="Placeholder"
                            invalid={(errors.mainFilterSearchBox?.email?.placeholder && touched.mainFilterSearchBox?.email?.placeholder) as boolean}
                            errorMessage={errors.mainFilterSearchBox?.email?.placeholder}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="mainFilterSearchBox.email.placeholder"
                                placeholder="abc@gmail.com"
                                component={Input}
                                prefix={
                                    <HiLink className='text-xl text-brown-400' />
                                }
                            />
                            </FormItem>   
                        </div>


                        {/* Phone */}
                        <FormDesription
                            title="Phone"
                            desc=""
                        />
                        <div className='flex gap-4 w-auto'>
                            <FormItem
                            className='w-1/2'
                            label="Title"
                            invalid={(errors.mainFilterSearchBox?.phone?.title && touched.mainFilterSearchBox?.phone?.title) as boolean}
                            errorMessage={errors.mainFilterSearchBox?.phone?.title}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="mainFilterSearchBox.phone.title"
                                placeholder="Phone"
                                component={Input}
                                prefix={
                                    <HiOutlinePhone className='text-xl text-pink-400' />
                                }
                            />
                            </FormItem>

                            <FormItem
                            className='w-1/2'
                            label="Placeholder"
                            invalid={(errors.mainFilterSearchBox?.phone?.placeholder && touched.mainFilterSearchBox?.phone?.placeholder) as boolean}
                            errorMessage={errors.mainFilterSearchBox?.phone?.placeholder}
                            >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="mainFilterSearchBox.phone.placeholder"
                                placeholder="+91-XXXXXXXXXXX"
                                component={Input}
                                prefix={
                                    <HiLink className='text-xl text-pink-400' />
                                }
                            />
                            </FormItem>   
                        </div>
                            
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


export default HeroSection