import * as yup from "yup";

const schema = yup.object().shape({
  titleTask: yup.string().required('O campo não pode ficar vazio'),
  contentTask: yup.string().required('O campo não pode ficar vazio'),
})

export default schema;