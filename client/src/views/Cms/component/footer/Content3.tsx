import * as Yup from 'yup'

import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import { FcPlus, FcTimeline, FcTreeStructure } from 'react-icons/fc';
import {
    HiOutlineGlobeAlt,
    HiOutlineMinusCircle,
} from 'react-icons/hi'
import { FooterFormModel, fetchFooterData, putFooterData, useAppDispatch } from './store';
import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import Switcher from '@/components/ui/Switcher'
import toast from '@/components/ui/toast'

type ProfileProps = {
    data?: FooterFormModel
}

const validationSchema = Yup.object().shape({
    published: Yup.boolean().required('Visibility is required'),
    title: Yup.string().required('Required'),
    menuList: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required('Menu Name is required'),
          routerPath: Yup.string().required('Router Path is required'),
        })
      )
      .required('At least one menu item is required'),
  });


const Content3 = ({ data }: ProfileProps) => {
    const dispatch = useAppDispatch();
    const initialData = {
        footerColumn: data?.footerColumn || 3,
        title: data?.title || '',
        published: data?.published || true,
        menuList: (data?.menuList || []).map(item => ({
            routerPath: item.routerPath || '',
            name: item.name || ''
          })),
    }
    
    const onFormSubmit = async (
        values: FooterFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: any
    ) => {
        try {
            setSubmitting(true);
            const response = await dispatch(putFooterData({ ...values, _id: data._id }));
            if(response.meta.requestStatus === 'fulfilled'){
                dispatch(fetchFooterData())
                toast.push(<Notification title={'Footer content 3 updated'} type="success" />, {
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
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting,resetForm }) => {
                setSubmitting(true);
                setTimeout(() => {
                onFormSubmit(values, setSubmitting,resetForm);
                }, 1000);
            }}
            >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors };
                return (
                <Form>
                    <FormContainer>
                    <FormDesription
                        title="Footer Content 3"
                        desc="Basic info for the content of footer 3"
                    />

                    <FormRow name="published" label="Published" {...validatorProps} border={false}>
                        <Field name="published" component={Switcher} />
                    </FormRow>

                    {values.published && (
                        <>
                        <FormRow name="title" label="Footer Title" {...validatorProps}>
                            <Field
                            type="text"
                            autoComplete="off"
                            name="title"
                            placeholder="Title"
                            component={Input}
                            prefix={<FcTimeline className="text-xl" />}
                            />
                        </FormRow>

                        <FormRow name="" label="Menu List" {...validatorProps}>
                        <FieldArray name="menuList">
                            {({ push, remove, form }) => (
                            <>
                                {values.menuList.map((menu, index) => (
                                <div key={index} className="flex justify-between gap-4 mb-2">
                                    <div>
                                        <Field
                                        type="text"
                                        autoComplete="off"
                                        name={`menuList.${index}.name`}
                                        placeholder="Name"
                                        component={Input}
                                        prefix={<FcTreeStructure className="text-xl" />}
                                        />
                                        <ErrorMessage className='text-red-400' name={`menuList.${index}.name`} />
                                    </div>
                                    <div>
                                        <Field
                                        type="text"
                                        autoComplete="off"
                                        name={`menuList.${index}.routerPath`}
                                        placeholder="Router Path"
                                        component={Input}
                                        prefix={<HiOutlineGlobeAlt className="text-xl text-blue-500" />}
                                        />
                                        <ErrorMessage className='text-red-400' name={`menuList.${index}.routerPath`} />
                                    </div>
                                    <button type="button" onClick={() => remove(index)}>
                                    <HiOutlineMinusCircle size={22} className="rounded-full hover:bg-red-400 hover:text-white" />
                                    </button>
                                </div>
                                ))}
                                <button
                                type="button"
                                onClick={() => push({ name: '', routerPath: '' })}
                                className="border rounded-2xl px-2 py-1"
                                >
                                <span className="flex items-center gap-2">
                                    <FcPlus />
                                    Add menu
                                </span>
                                </button>
                            </>
                            )}
                        </FieldArray>
                        </FormRow>

                        </>
                    )}

                    <div className="mt-4 ltr:text-right">
                        <Button
                        className="ltr:mr-2 rtl:ml-2"
                        type="button"
                        onClick={() => resetForm()}
                        >
                        Reset
                        </Button>
                        <Button variant="solid" loading={isSubmitting} type="submit">
                        {isSubmitting ? 'Updating' : 'Edit'}
                        </Button>
                    </div>
                    </FormContainer>
                </Form>
                );
            }}
            </Formik>
    )
}

export default Content3
