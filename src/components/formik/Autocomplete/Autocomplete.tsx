import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import Select, { MultiValue, SingleValue } from "react-select";

export interface AutocompleteProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  clearFields?: string[];
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
            const clearFieldsFn = async () => {
              await clearFields.forEach((fieldToClear) => {
                console.log(fieldToClear);
                if (fieldToClear) {
                  form.setFieldValue(fieldToClear, "");
                }
              });
              form.validateForm();
            };

            const handleSelectChange = (
              selectedOption:
                | MultiValue<{ value: string; label: string } | undefined>
                | SingleValue<{ value: string; label: string } | undefined>
            ) => {
              clearFieldsFn();
              if (selectedOption) {
                if (Array.isArray(selectedOption)) {
                  // multi select case
                  form.setFieldValue(
                    name,
                    selectedOption.map((option) => option.value)
                  );
                } else if (selectedOption && "value" in selectedOption) {
                  // single select case
                  form.setFieldValue(name, selectedOption.value);
                }
              } else {
                if (isMulti) {
                  form.setFieldValue(name, []);
                } else {
                  form.setFieldValue(name, "");
                }
              }
            };

            return (
              <FormControl isInvalid={!!meta.error && meta.touched}>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Select
                  value={
                    Array.isArray(field.value)
                      ? field.value.map((i: string) =>
                          options.find((option) => option.value === i)
                        )
                      : field.value === ""
                      ? null
                      : options.find((option) => option.value === field.value)
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
