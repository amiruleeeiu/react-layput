import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import RadioButtonGroup from "../components/formik/FormRadioGroup";
import InputField from "../components/formik/InputField";

export interface User {
  name: string;
  email: string;
  gender: string;
}

export interface MyFormProps {
  initialValues: User;
  onSubmit?: (values: { name: string; email: string; gender: string }) => void;
}

const MyForm: React.FC<MyFormProps> = ({
  onSubmit,
  initialValues = { name: "", email: "", gender: "" },
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: { name?: string; email?: string; gender?: string } = {};

        if (!values.name) {
          errors.name = "Name Required";
        }

        if (!values.email) {
          errors.email = "Email Required";
        }
        if (!values.gender) {
          errors.gender = "Gender Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        if (onSubmit) {
          onSubmit(values);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="name" label="Name" placeholder="Name" />
          <InputField
            type="email"
            name="email"
            label="Email"
            placeholder="Email"
          />

          <RadioButtonGroup
            name="gender"
            label="Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
          <Flex justifyContent="flex-end">
            <Button type="submit" isLoading={isSubmitting} mt={4}>
              Submit
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
