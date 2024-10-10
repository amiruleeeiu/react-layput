import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const DatePickerField: React.FC<InputFieldProps> = ({
  name,
  label,
  isVisible = true,
  col = 12,
}) => {
  console.log("input field");
  return (
    <>
      {isVisible ? (
        <GridItem colSpan={{ base: 12, md: col }}>
          <Field name={name}>
            {({ field, form, meta }: FieldProps) => {
              return (
                <FormControl isInvalid={!!(meta.touched && meta.error)}>
                  <FormLabel htmlFor={name}>{label}</FormLabel>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    showIcon
                    toggleCalendarOnIconClick
                    selected={field.value}
                    placeholderText="Select date"
                    isClearable
                    onChange={(date) => form.setFieldValue(name, date)}
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

export default DatePickerField;
