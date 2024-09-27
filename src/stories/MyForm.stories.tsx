import { ChakraProvider } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react";
import MyForm, { MyFormProps } from "../pages/FormBuilder";

export default {
  title: "Forms/MyForm",
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
  component: MyForm,
  argTypes: {
    onSubmit: { action: "submit" }, // Log the submit action
  },
} as Meta;

const Template: StoryFn<MyFormProps> = (args) => <MyForm {...args} />;

export const DefaultForm = Template.bind({});
DefaultForm.args = {}; // No initial values, default behavior

export const InvalidForm = Template.bind({});
InvalidForm.args = {
  initialValues: {
    name: "John Doe",
    email: "invalid-email",
    gender: "male",
  },
};

export const PrefilledForm = Template.bind({});
PrefilledForm.args = {
  initialValues: {
    name: "John Doe",
    email: "johndoe@example.com",
    gender: "male",
  },
};
