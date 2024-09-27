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
  clearFields?: { name: string; value: string }[];
  isDisabled?: boolean;
  isVisible?: boolean;
  placeholder?: string;
  col?: number;
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
}) => {
  return (
    <GridItem colSpan={{ base: 12, md: col }}>
      {isVisible && (
        <Field name={name}>
          {({ field, form, meta }: FieldProps) => {
            const handleChange = (
              selectedOption: { value: string; label: string } | null
            ) => {
              if (selectedOption) {
                form.setFieldValue(name, selectedOption.value);
              } else {
                clearFields.forEach((fieldToClear) => {
                  if (
                    fieldToClear.name &&
                    form.getFieldProps(fieldToClear.name)
                  ) {
                    form.setFieldValue(fieldToClear.name, "");
                  }
                });
                if (field.name && form.getFieldProps(field.name)) {
                  form.setFieldValue(name, "");
                }
              }
            };

            return (
              <FormControl isInvalid={!!meta.error && meta.touched}>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Select
                  value={
                    options.find((option) => option.value === field.value) ||
                    null
                  }
                  onChange={handleChange}
                  options={options}
                  isClearable
                  isDisabled={isDisabled}
                  placeholder={placeholder}
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
