import { Button, Flex, Grid } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Autocomplete from "../components/formik/Autocomplete";
import RadioButtonGroup from "../components/formik/FormRadioGroup";
import InputField from "../components/formik/InputField";

export interface User {
  name: string;
  email: string;
  gender: string;
  isNrb: string;
  nid: string;
  passport: string;
  districtId: string;
  thanaId: string;
  address: string;
  divisionId: string;
  skills: string[];
}

export interface MyFormProps {
  initialValues: User;
  onSubmit?: (values: { name: string; email: string; gender: string }) => void;
}

const MyForm: React.FC<MyFormProps> = ({
  onSubmit,
  initialValues = {
    name: "",
    email: "",
    gender: "",
    isNrb: "false",
    nid: "",
    passport: "",
    divisionId: "",
    districtId: "",
    thanaId: "",
    address: "",
    skills: [],
  },
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: {
          name?: string;
          email?: string;
          gender?: string;
          nid?: string;
          passport?: string;
          divisionId?: string;
          districtId?: string;
          thanaId?: string;
          address?: string;
        } = {};

        if (!values.name) {
          errors.name = "Name is Required";
        }

        if (!values.email) {
          errors.email = "Email is Required";
        }
        if (!values.gender) {
          errors.gender = "Gender is Required";
        }
        if (!values.divisionId) {
          errors.divisionId = "Division is Required";
        }
        if (!values.districtId) {
          errors.districtId = "District is Required";
        }
        if (!values.thanaId) {
          errors.thanaId = "Thana is Required";
        }
        if (!values.email) {
          errors.email = "Email is Required";
        }
        if (!values.address) {
          errors.address = "Address is Required";
        }
        if (!values.nid && values.isNrb == "false") {
          errors.nid = "Nid is Required";
        }
        if (!values.passport && values.isNrb == "true") {
          errors.passport = "Passport is Required";
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
      {({ values, isSubmitting }) => (
        <Form>
          <Grid templateColumns="repeat(12, 1fr)" gap={2}>
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
            <RadioButtonGroup
              name="isNrb"
              label="Is Nrb"
              options={[
                { value: "true", label: "Yes" },
                { value: "false", label: "No" },
              ]}
              clearFields={[
                { name: "nid", value: "true" },
                { name: "passport", value: "false" },
              ]}
            />
            <InputField
              name="nid"
              label="Nid"
              placeholder="Nid"
              isVisible={values.isNrb == "false"}
            />

            <InputField
              name="passport"
              label="Passport"
              placeholder="Passport"
              isVisible={values.isNrb == "true"}
            />

            <Autocomplete
              placeholder="Select Division"
              name="divisionId"
              label="Division"
              options={[
                { label: "Dhaka", value: "1" },
                { label: "Khulna", value: "2" },
                { label: "Rajshahi", value: "3" },
              ]}
              clearFields={["districtId", "thanaId"]}
            />

            <Autocomplete
              placeholder="Select District"
              name="districtId"
              label="District"
              options={[
                { label: "Dhaka", value: "1" },
                { label: "Kushtia", value: "2" },
                { label: "Meherpur", value: "3" },
              ]}
              //  isLoading={values.divisionId ? true : false}
              isDisabled={!values.divisionId}
              clearFields={[{ name: "thanaId", value: "" }]}
              col={6}
            />

            <Autocomplete
              placeholder="Select Thana"
              name="thanaId"
              label="Thana"
              options={[
                { label: "Mirpur", value: "1" },
                { label: "Gangni", value: "2" },
                { label: "Meherpur Sadar", value: "3" },
              ]}
              isDisabled={!values.districtId}
              col={6}
            />
            <Autocomplete
              placeholder="Select Skill"
              name="skills"
              label="Skill"
              options={[
                { label: "React", value: "1" },
                { label: "Angular", value: "2" },
                { label: "Vue", value: "3" },
              ]}
              isMulti
            />

            <InputField name="address" label="Address" placeholder="Address" />
          </Grid>

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
