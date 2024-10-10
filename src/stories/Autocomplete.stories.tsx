// Autocomplete.stories.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react";
import { Form, Formik } from "formik";
import Autocomplete, { AutocompleteProps } from "../components/formik/Autocomplete/Autocomplete";

export default {
  title: "Components/Autocomplete",
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
  component: Autocomplete,
} as Meta;

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const Template: StoryFn<AutocompleteProps> = (args) => (
  <Formik
    initialValues={{ selectField: "" }}
    onSubmit={(values) => console.log("Form values:", values)}
  >
    {() => (
      <Form>
        <Autocomplete {...args} />
      </Form>
    )}
  </Formik>
);

export const Default = Template.bind({});
Default.args = {
  name: 'selectField',
  label: 'Select an Option',
  options: options,
  isDisabled: false,
  isVisible: true,
  placeholder: 'Select an option...',
  isMulti: false,
  isLoading: false,
};

// MultiSelect Story
export const MultiSelect = Template.bind({});
MultiSelect.args = {
  name: 'selectField',
  label: 'Select Multiple Options',
  options: options,
  isDisabled: false,
  isVisible: true,
  placeholder: 'Select options...',
  isMulti: true,
  isLoading: false,
};

// Disabled Story
export const Disabled = Template.bind({});
Disabled.args = {
  name: 'selectField',
  label: 'Disabled Select',
  options: options,
  isDisabled: true,
  isVisible: true,
  placeholder: 'Select an option...',
  isMulti: false,
  isLoading: false,
};