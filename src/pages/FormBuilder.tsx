import { Button, Flex, Grid } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { z } from "zod";
import Autocomplete from "../components/formik/Autocomplete/Autocomplete";
import DatePickerField from "../components/formik/DatePickerField/DatePickerField";
import EditorField from "../components/formik/EditorField";
import FormikSelectField from "../components/formik/FormikSelectField";
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
  fields: Fields[];
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
  value?: string;
  type?: string;
  placeholder?: string;
  label: string;
  options?: Option[];
  isVisible?: boolean;
  visible?: Visible;
  clearFields?: string[] | ClearField[];
  dependency?: string;
  isMulti?: boolean;
  col?: number;
  isDisabled?: boolean;
}

const getField = (
  properties: Fields,
  values: Record<string, string>,
  index: number
) => {
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
    dependency,
    col,
  } = properties || {};
  console.log(type, values[name]);

  const getAutocompleteOptions = () => {
    if (dependency && values[dependency] && options?.length) {
      return options;
    } else if (!dependency && options?.length) {
      return options;
    } else {
      return [];
    }
  };

  delete properties.value;

  switch (type) {
    case "autocomplete":
      return (
        <Autocomplete
          placeholder={placeholder || label}
          name={name}
          label={label}
          options={getAutocompleteOptions()}
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
    case "select":
      return (
        <FormikSelectField
          isVisible={isVisible}
          name={name}
          label={label}
          placeholder={label}
          key={index}
          options={options}
        />
      );
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
  fields = [
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
      name: "type",
      label: "Select Type",
      type: "select",
      options: [
        { label: "Type 1", value: "1" },
        { label: "Type 2", value: "2" },
        { label: "Type 3", value: "3" },
      ],
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
      dependency: "divisionId",
    },
    {
      name: "thanaId",
      label: "Select Thana",
      type: "autocomplete",
      dependency: "districtId",
      options: options,
    },
    { name: "address", label: "Address", type: "text" },
    {
      name: "skills",
      label: "Select Skills",
      type: "autocomplete",
      options: skillOptions,
      isMulti: true,
    },
    { name: "about", label: "About", type: "editor" },
  ],
}) => {
  const initialValues = fields.reduce(
    (acc: { [key: string]: string }, field: Fields) => {
      acc[field.name] = field.value || "";
      return acc;
    },
    {}
  );

  const createDynamicSchema = (
    initialValues: Record<string, any>
  ): z.ZodObject<any> => {
    const shape: Record<string, z.ZodTypeAny> = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    Object.keys(initialValues).forEach((key) => {
      // Check for specific types if known
      switch (key) {
        case "email":
          shape[key] = z
            .string()
            .regex(emailRegex, { message: "Invalid email address" })
            .refine((val) => val !== "", { message: "This field is required" });
          break;

        case "birthDate":
          shape[key] = z.string().min(1, { message: "This field is required" });
          break;

        // case "gender":
        //   shape[key] = z
        //     .enum(["male", "female", "other"], {
        //       errorMap: () => ({ message: "Invalid selection" }),
        //     })
        //     .min(1, { message: "This field is required" });
        //   break;

        default:
          // Assume all other fields are required strings
          shape[key] = z.string().min(1, { message: "This field is required" });
          break;
      }
    });

    return z.object(shape);
  };

  // Generate the dynamic Zod schema
  const dynamicSchema = createDynamicSchema(initialValues);

  console.log(dynamicSchema);

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        try {
          dynamicSchema.parse(values); // Validate using Zod schema
          return {}; // Return empty object if no errors
        } catch (err) {
          // Return validation errors in a format compatible with Formik
          const errors: Record<string, string> = {};
          if (err instanceof z.ZodError) {
            err.errors.forEach((error) => {
              errors[error.path[0]] = error.message; // Map errors to field names
            });
          }
          return errors;
        }
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);

        setSubmitting(false);
      }}
    >
      {({ values, errors, isSubmitting }) => {
        console.log(values);
        console.log(errors);
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
