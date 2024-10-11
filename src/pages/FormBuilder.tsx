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

interface ClearField {
  name: string;
  value: string;
}

export interface Visible {
  name: string;
  value: string;
}

interface Fields {
  name: string;
  type?: string;
  placeholder?: string;
  label: string;
  options?: Option[];
  isVisible?: boolean;
  visible?: Visible;
  clearFields?: string[] | ClearField[];
  isMulti?: boolean;
  col?: number;
  isDisabled?: boolean;
}

const getField = (properties: Fields, values: any, index: number) => {
  const {
    type,
    name,
    options,
    label,
    placeholder,
    clearFields,
    isVisible,
    visible,
    isMulti,
    isDisabled,
    col,
  } = properties || {};
  console.log(type, values[name]);
  switch (type) {
    case "autocomplete":
      return (
        <Autocomplete
          placeholder={placeholder || label}
          name={name}
          label={label}
          options={options || []}
          clearFields={clearFields}
          isMulti={isMulti}
          isDisabled={isDisabled}
          col={col}
          key={index}
        />
      );
    case "radio":
      return (
        <RadioButtonGroup
          col={col}
          name={name}
          label={label}
          clearFields={clearFields as { name: string; value: string }[]}
          options={options || []}
          key={index}
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
          key={index}
        />
      );
    case "editor":
      return <EditorField {...properties} key={index} isVisible={isVisible} />;
    default:
      return (
        <InputField
          {...properties}
          placeholder={label}
          isVisible={visible && values[visible.name] == visible?.value}
          type="text"
          key={index}
        />
      );
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
  const fields: Fields[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
    { name: "birthDate", label: "Birth Date", type: "date" },
    {
      name: "isNrb",
      label: "Is Nrb",
      type: "radio",
      options: [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
      ],

      clearFields: [
        { name: "nid", value: "true" },
        { name: "passport", value: "false" },
      ],
    },
    {
      name: "nid",
      label: "NID",
      type: "text",
      visible: { name: "isNrb", value: "false" },
    },
    {
      name: "passport",
      label: "Passport",
      type: "text",
      visible: { name: "isNrb", value: "true" },
    },
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
      isMulti: true,
    },
    { name: "address", label: "Address", type: "text" },
    { name: "about", label: "About", type: "editor" },
  ];
  const initialValues1 = fields.reduce((acc, field) => {
    acc[field.name] = field.value || "";
    return acc;
  }, {});

  console.log(initialValues1);    

  return (
    <Formik
      initialValues={initialValues1}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        if (onSubmit) {
          onSubmit(values);
        }
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => {
        console.log(values);
        return (
          <Form>
            <Grid templateColumns="repeat(12, 1fr)" gap={2}>
              {fields.map((field, index) => getField(field, values, index))}
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
