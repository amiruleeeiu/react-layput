import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Select,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import React from "react";

type SelectFieldProps = {
  name: string;
  label: string;
  type?: "text" | "number" | "email";
  placeholder?: string;
  options?: { label: string; value: string }[];
  isVisible?: boolean;
  col?: number;
};

const FormikSelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  isVisible = true,
  col = 12,
}) => {
  return (
    <>
      {isVisible ? (
        <GridItem colSpan={{ base: 12, md: col }}>
          <Field name={name}>
            {({ field, meta }: FieldProps) => {
              return (
                <FormControl isInvalid={!!(meta.touched && meta.error)}>
                  <FormLabel htmlFor={name}>{label}</FormLabel>
                  <Select {...field}>
                    <option value="">Select Option</option>
                    {options?.map((i, index) => (
                      <option value={i.value} key={index}>
                        {i.label}
                      </option>
                    ))}
                  </Select>
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

export default FormikSelectField;
