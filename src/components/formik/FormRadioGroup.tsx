import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

interface RadioButtonGroupProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  clearFields?: { name: string; value: string }[];
  col?: number;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name,
  label,
  options,
  clearFields = [],
  col = 12,
}) => {
  return (
    <GridItem colSpan={{ base: 12, md: col }}>
      <Field name={name}>
        {({ field, form, meta }: FieldProps) => {
          const handleChange = (value: string) => {
            console.log(clearFields);
            clearFields.map((i) => {
              if (i.value === value) {
                form.setFieldValue(i.name, "");
              }
            });
            form.setFieldValue(name, value);
          };

          console.log("radio field");

          return (
            <FormControl isInvalid={!!meta.error && meta.touched}>
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <RadioGroup
                {...field}
                id={name}
                onChange={handleChange}
                value={field.value}
              >
                <Stack direction="row">
                  {options.map((option) => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              {meta.error && meta.touched && (
                <FormErrorMessage>{meta.error}</FormErrorMessage>
              )}
            </FormControl>
          );
        }}
      </Field>
    </GridItem>
  );
};

export default RadioButtonGroup;
