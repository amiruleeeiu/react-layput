import {
  Center,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
} from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { Field, FieldProps } from "formik";
import React, { useState } from "react";
import { Visible } from "../../pages/FormBuilder";

type EditorFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  isVisible?: Visible | boolean;
  disabled?: boolean;
  col?: number;
};

const EditorField: React.FC<EditorFieldProps> = ({
  name,
  label,
  disabled,
  isVisible = true,
  col = 12,
}) => {
 
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isVisible ? (
        <GridItem colSpan={{ base: 12, md: col }}>
          <Field name={name}>
            {({ field, form, meta }: FieldProps) => {
              return (
                <FormControl isInvalid={!!(meta.touched && meta.error)}>
                  <FormLabel htmlFor={name}>{label}</FormLabel>
                  {isLoading && (
                    <Flex>
                      <Center w={"100%"}>
                        <CircularProgress isIndeterminate color="blue.500" />
                      </Center>
                    </Flex>
                  )}
                  <Editor
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
                    disabled={disabled}
                    onEditorChange={(value: string | unknown) => {
                      form.setFieldValue(name, value);
                    }}
                    onInit={() => setIsLoading(false)}
                    value={field.value}
                    init={{
                      height: 300,
                      browser_spellcheck: true,
                      menubar: "file edit view insert format table tools help",
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                        "table",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | table | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      spellchecker_language: "en",
                    }}
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

export default EditorField;
