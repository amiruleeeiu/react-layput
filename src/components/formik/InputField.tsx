import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import React from "react";

type InputFieldProps = {
  name: string;
  label: string;
  type?: "text" | "number" | "email"; // Extend with other types if needed
  placeholder?: string;
  maxLength?: number;
  min?: number;
  max?: number;
};

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  maxLength,
  min,
  max,
}) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = event.target;

          if (type === "number" && (isNaN(Number(value)) || value === "")) {
            return;
          }

          form.setFieldValue(name, value);
        };

        return (
          <FormControl isInvalid={!!(meta.touched && meta.error)}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              maxLength={maxLength}
              min={min}
              max={max}
              onChange={handleChange}
              aria-describedby={`${name}-error`} // Accessibility improvement
            />
            <FormErrorMessage id={`${name}-error`}>
              {meta.touched && meta.error}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default InputField;
