import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { ChakraProvider } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react"; // Updated imports
import DataTable from "../pages/DataTable";

// Example Data Interface
interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
  education: string;
  age: string;
  role: string;
}

// Sample Data
const sampleData: UserData[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    phone: "01746162232",
    designation: "Developer",
    age: "30",
    education: "Bsc",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    phone: "01746162231",
    designation: "Developer",
    age: "30",
    education: "Bsc",
  },
  {
    id: 3,
    name: "Sam Wilson",
    email: "sam@example.com",
    role: "Moderator",
    phone: "01746162231",
    designation: "Developer",
    age: "30",
    education: "Bsc",
  },
];

// Define Columns for the Table
const columns = [
  { label: "ID", accessor: "id" },
  { label: "Name", accessor: "name" },
  { label: "Email", accessor: "email" },
  { label: "Phone", accessor: "phone" },
  { label: "Designation", accessor: "designation" },
  { label: "Education", accessor: "education" },
  { label: "Age", accessor: "age" },
  { label: "Role", accessor: "role" },
];

// Default export for the story configuration
export default {
  title: "Components/DataTable",
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
  component: DataTable,
} as Meta;

// Template for creating stories
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: StoryFn<any> = (args) => <DataTable {...args} />;

// Action handlers for table buttons
const onEdit = (row: UserData) => {

  alert(`Editing user: ${row.id}`);
};

const onDelete = (row: UserData) => {
  alert(`Deleting user: ${row.id}`);
};

const onView = (row: UserData) => {
  alert(`Viewing user: ${row.id}`);
};

// Story with Actions
export const WithActions = Template.bind({});
WithActions.args = {
  columns: columns,
  data: sampleData,
  caption: "User Data Table",
  actions: {
    edit: {
      label: "Edit",
      icon: <EditIcon />,
      onClick: onEdit,
    },
    delete: {
      label: "Delete",
      icon: <DeleteIcon />,
      onClick: onDelete,
    },
    view: {
      label: "View",
      icon: <ViewIcon />,
      onClick: onView,
    },
  },
};

// Story without actions
export const WithoutActions = Template.bind({});
WithoutActions.args = {
  columns: columns,
  data: sampleData,
  caption: "User Data Table (No Actions)",
};
