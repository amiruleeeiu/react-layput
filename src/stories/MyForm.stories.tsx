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
    onSubmit: { action: "submit" },
  },
} as Meta;

const Template: StoryFn<MyFormProps> = (args) => <MyForm {...args} />;

export const DefaultForm = Template.bind({});
DefaultForm.args = {};

export const InvalidForm = Template.bind({});
InvalidForm.args = {
  initialValues: {
    name: "John Doe",
    email: "invalid-email",
    gender: "male",
    isNrb: "false",
    nid: "",
    passport: "",
    divisionId: "1",
    districtId: "",
    thanaId: "",
    address: "",
  },
};

export const PrefilledForm = Template.bind({});
PrefilledForm.args = {
  initialValues: {
    name: "John Doe",
    email: "johndoe@example.com",
    gender: "male",
    isNrb: "false",
    nid: "345353",
    passport: "2342342",
    divisionId: "1",
    districtId: "2",
    thanaId: "2",
    address: "Meherpur sadar",
  },
};
