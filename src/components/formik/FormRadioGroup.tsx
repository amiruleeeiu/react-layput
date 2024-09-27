import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

interface RadioButtonGroupProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name,
  label,
  options,
}) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        const handleChange = (value: string) => {
          form.setFieldValue(name, value);
        };

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
  );
};

export default RadioButtonGroup;
