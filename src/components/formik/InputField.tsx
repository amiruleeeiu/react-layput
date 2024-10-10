import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import React from "react";

type InputFieldProps = {
  name: string;
  label: string;
  type?: "text" | "number" | "email";
  placeholder?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  isVisible?: boolean;
  col?: number;
};

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  maxLength,
  min,
  max,
  isVisible = true,
  col = 12,
}) => {
  console.log("input field");
  return (
    <>
      {isVisible ? (
        <GridItem colSpan={{ base: 12, md: col }}>
          <Field name={name}>
            {({ field, meta }: FieldProps) => {
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
                    aria-describedby={`${name}-error`} // Accessibility improvement
                  />
                  <FormErrorMessage id={`${name}-error`}>
                    {meta.touched && meta.error}
                  </FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>
        </GridItem>
      ) : null}
    </>
  );
};

export default InputField;
