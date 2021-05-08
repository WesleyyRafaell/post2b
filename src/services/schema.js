import * as yup from "yup";

const schema = yup.object().shape({
  input: yup.string().required('O campo não pode ficar vazio'),
})

export default schema;