import * as Yup from 'yup'

import { FcPlus, FcTimeline, FcTreeStructure } from 'react-icons/fc';
import { Field, FieldArray, Form, Formik } from 'formik'
import type { FieldInputProps, FormikProps } from 'formik'
import {
    HiOutlineGlobeAlt,
    HiOutlineMinusCircle,
    HiOutlineUserCircle,
    HiPlus,
} from 'react-icons/hi'
import { useEffect, useState } from "react";

import Button from '@/components/ui/Button'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from '../common/FormDescription'
import FormRow from '../common/FormRow'
import Input from '@/components/ui/Input'
import Notification from '@/components/ui/Notification'
import Switcher from '@/components/ui/Switcher'
import toast from '@/components/ui/toast'

export type FooterFormModel = {
    title: string;
    menuList: Array<{ name: string; routerPath: string }>;
    published: Boolean
}

type ProfileProps = {
    data?: FooterFormModel
}

const validationSchema = Yup.object().shape({
    published: Yup.boolean().required('Visibility is required'),
    title: Yup.string().required('Footer Title is required'),
    menuList: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required('Menu Name is required'),
          routerPath: Yup.string().required('Router Path is required'),
        })
      )
      .required('At least one menu item is required'),
  });


const Content3 = ({
    data = {
        title: '',
        published: true,
        menuList: [],
    },
}: ProfileProps) => {
    const [ ispublished , setIspublished ] = useState(data.published);

    useEffect(() => {
        setIspublished(data.published);
    }, [data.published]);

    const onSetFormFile = (
        form: FormikProps<FooterFormModel>,
        field: FieldInputProps<FooterFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (
        values: FooterFormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: any
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'Footer content3 updated'} type="success" />, {
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
                        title="Footer Content 1"
                        desc="Basic info for the content of footer 1"
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

                        <FormRow name="title" label="Menu List" {...validatorProps}>
                        <FieldArray name="menuList">
                            {({ push, remove, form }) => (
                            <>
                                {values.menuList.map((menu, index) => (
                                <div key={index} className="flex justify-between gap-4 mb-2">
                                    <div>
                                    <FormRow name={`menuList.${index}.name`} label="Name" {...validatorProps}>
                                        <Field
                                        type="text"
                                        autoComplete="off"
                                        name={`menuList.${index}.name`}
                                        placeholder="Name"
                                        component={Input}
                                        prefix={<FcTreeStructure className="text-xl" />}
                                        />
                                    </FormRow>
                                    </div>
                                    <div>
                                    <FormRow name={`menuList.${index}.routerPath`} label="RouterPath" {...validatorProps}>
                                        <Field
                                        type="text"
                                        autoComplete="off"
                                        name={`menuList.${index}.routerPath`}
                                        placeholder="Router Path"
                                        component={Input}
                                        prefix={<HiOutlineGlobeAlt className="text-xl text-blue-500" />}
                                        />
                                    </FormRow>
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
                        {isSubmitting ? 'Updating' : 'Save'}
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
