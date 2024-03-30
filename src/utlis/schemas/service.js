import * as yup from "yup";

const serviceSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  desc: yup.string().required("Description is required"),
  address: yup.string().required("Address is required"),
});

export default serviceSchema;
