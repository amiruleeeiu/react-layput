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
    about: "",
    skills: ["1", "3"],
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
    about:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    address: "Meherpur sadar",
    skills: ["1", "3"],
  },
};
