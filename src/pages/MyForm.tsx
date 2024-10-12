import { Button, Flex, Grid } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Autocomplete from "../components/formik/Autocomplete/Autocomplete";
import DatePickerField from "../components/formik/DatePickerField/DatePickerField";
import EditorField from "../components/formik/EditorField";
import RadioButtonGroup from "../components/formik/FormRadioGroup";
import InputField from "../components/formik/InputField";

export interface User {
  name: string;
  email: string;
  gender: string;
  birthDate: string;
  isNrb: string;
  nid: string;
  passport: string;
  districtId: string;
  thanaId: string;
  address: string;
  divisionId: string;
  about: string;
  skills: string[];
}

export interface MyFormProps {
  initialValues: User;
  onSubmit?: (values: { name: string; email: string; gender: string }) => void;
}

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: "Mirpur", value: "1" },
  { label: "Gangni", value: "2" },
  { label: "Meherpur Sadar", value: "3" },
];

const skillOptions: Option[] = [
  { label: "React", value: "1" },
  { label: "Angular", value: "2" },
  { label: "Vue", value: "3" },
];

interface Fields {
  name: string;
  type?: string;
  placeholder?: string;
  label: string;
  options?: Option[];
  isVisible?: boolean;
  clearFields?: string[];
  isMulti?: boolean;
  col?: number;
  isDisabled?: boolean;
}

const getField = (properties: Fields) => {
  const {
    type,
    name,
    options,
    label,
    placeholder,
    clearFields,
    isVisible,
    isMulti,
    isDisabled,
    col,
  } = properties || {};
  delete properties.type;
  switch (type) {
    case "autocomplete":
      return (
        <Autocomplete
          placeholder={placeholder}
          name={name}
          label={label}
          options={options || []}
          clearFields={clearFields}
          isMulti={isMulti}
          isDisabled={isDisabled}
          col={col}
        />
      );
    case "radio":
      return (
        <RadioButtonGroup
          col={col}
          name={name}
          label={label}
          options={options || []}
        />
      );
    case "date":
      return (
        <DatePickerField
          isVisible={isVisible}
          name={name}
          label={label}
          placeholder={label}
          col={col}
        />
      );
    case "editor":
      return <EditorField {...properties} />;
    default:
      return <InputField {...properties} type="text" />;
  }
};

const MyForm: React.FC<MyFormProps> = ({
  onSubmit,
  initialValues = {
    name: "",
    email: "",
    gender: "",
    birthDate: "",
    isNrb: "false",
    nid: "",
    passport: "",
    divisionId: "",
    districtId: "",
    thanaId: "",
    address: "",
    about: "",
    skills: [],
  },
}) => {
  const fields: Fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email", col: 6 },
    { name: "gender", label: "Gender", type: "radio", col: 6 },
    { name: "birthDate", label: "Birth Date", type: "date" },
    {
      name: "isNrb",
      label: "Is Nrb",
      type: "radio",
      // clearFields: [
      //   { name: "nid", value: "true" },
      //   { name: "passport", value: "false" },
      // ],
    },
    { name: "nid", label: "NID", type: "text" },
    { name: "passport", label: "Passport", type: "text" },
    {
      name: "divisionId",
      label: "Select Division",
      type: "autocomplete",
      options: options,
      clearFields: ["districtId", "thanaId"],
    },
    {
      name: "districtId",
      label: "Select District",
      type: "autocomplete",
      options: options,
      clearFields: ["thanaId"],
    },
    {
      name: "thanaId",
      label: "Select Thana",
      type: "autocomplete",
      options: options,
    },
    {
      name: "skills",
      label: "Select Skills",
      type: "autocomplete",
      options: skillOptions,
    },
    { name: "address", label: "Address", type: "text" },
  ];
  const initialValues1 = fields.reduce((acc, field) => {
    acc[field.name] = field.value || "";
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};

        if (!values.divisionId) {
          errors.divisionId = "This Field is required";
        }
        if (!values.districtId) {
          errors.districtId = "This Field is required";
        }
        if (!values.thanaId) {
          errors.thanaId = "This Field is required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (onSubmit) {
          onSubmit(values);
        }
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => {
        // console.log(values);
        return (
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
              <DatePickerField
                name="birthDate"
                label="Birth Date"
                placeholder="Birth Date"
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

              <InputField
                name="address"
                label="Address"
                placeholder="Address"
              />
              <EditorField name="about" label="About" />
            </Grid>

            <Flex justifyContent="flex-end">
              <Button type="submit" isLoading={isSubmitting} mt={4}>
                Submit
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MyForm;
