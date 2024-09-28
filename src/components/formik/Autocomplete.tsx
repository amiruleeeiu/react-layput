import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import Select from "react-select";

interface AutocompleteProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  clearFields?: { name: string; value: string }[] | string[];
  isDisabled?: boolean;
  isVisible?: boolean;
  placeholder?: string;
  col?: number;
  isMulti?: boolean;
  isLoading?: boolean;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  name,
  label,
  options,
  clearFields = [],
  isDisabled = false,
  isVisible = true,
  placeholder = "Select",
  col = 12,
  isLoading = false,
  isMulti = false,
}) => {
  return (
    <GridItem colSpan={{ base: 12, md: col }}>
      {isVisible && (
        <Field name={name}>
          {({ field, form, meta }: FieldProps) => {
            const handleSelectChange = (
              selectedOption:
                | { value: string; label: string }
                | { value: string; label: string }[]
                | null
            ) => {
              console.log(selectedOption);
              if (selectedOption) {
                if (Array.isArray(selectedOption)) {
                  // multi select case
                  form.setFieldValue(
                    name,
                    selectedOption.map((option) => option.value)
                  );
                } else {
                  // single select case
                  form.setFieldValue(name, selectedOption.value);
                }
              } else {
                clearFields.forEach((fieldToClear) => {
                  const fieldProps = form.getFieldProps(
                    typeof fieldToClear === "string"
                      ? fieldToClear
                      : fieldToClear.name
                  );
                  if (fieldProps) {
                    form.setFieldValue(fieldProps.name, "");
                  }
                });
                if (isMulti) {
                  form.setFieldValue(name, []);
                } else {
                  form.setFieldValue(name, "");
                }
              }
            };

            console.log("autocomplete field");

            return (
              <FormControl isInvalid={!!meta.error && meta.touched}>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Select
                  value={
                    typeof field.value === "string"
                      ? options.find((option) => option.value === field.value)
                      : field.value.map((i: string) =>
                          options.find((option) => option.value === i)
                        ) || null
                  }
                  onChange={handleSelectChange}
                  isLoading={isLoading}
                  options={options}
                  isClearable
                  isDisabled={isDisabled || isLoading}
                  placeholder={placeholder}
                  isMulti={isMulti}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      padding: "2px",
                      border:
                        !!meta.error && meta.touched
                          ? "2px solid red"
                          : provided.border,
                      boxShadow:
                        meta.touched && !!meta.error
                          ? "0 0 0 1px transparent"
                          : provided.boxShadow,
                      "&:hover": {
                        border:
                          !!meta.error && meta.touched
                            ? "2px solid blue"
                            : provided.border,
                        borderColor: !!meta.error && meta.touched ? "red" : "",
                      },
                    }),
                  }}
                />
                {meta.error && meta.touched && (
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                )}
              </FormControl>
            );
          }}
        </Field>
      )}
    </GridItem>
  );
};

export default Autocomplete;
