import * as yup from "yup";

const footerSchema = yup.object().shape({
    published: yup.boolean().required('Visibility is required'),
    title: yup.string().required('Required'),
    menuList: yup.array()
      .of(
        yup.object().shape({
          name: yup.string().required('Menu Name is required'),
          routerPath: yup.string().required('Router Path is required'),
        })
      )
      .required('At least one menu item is required'),
});

export default footerSchema