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
  return (
    <>
      {isVisible ? (
        <GridItem colSpan={{ base: 12, md: col }}>
          <Field name={name}>
            {({ field, form, meta }: FieldProps) => {
              const handleChange = (
                event: React.ChangeEvent<HTMLInputElement>
              ) => {
                if (!event.target) {
                  console.error("InputField: Missing event.target");
                  return;
                }

                const { value } = event.target;

                if (
                  type === "number" &&
                  (isNaN(Number(value)) || value === "")
                ) {
                  return;
                }

                if (!form) {
                  console.error("InputField: Missing Formik form");
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
        </GridItem>
      ) : null}
    </>
  );
};

export default InputField;
