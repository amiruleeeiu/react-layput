import { Meta, StoryFn } from '@storybook/react';
import TestButton, { TestButtonProps } from './TestButton';

export default {
  title: 'Components/ui/TestButton',
  component: TestButton,
} as Meta;

const Template: StoryFn<TestButtonProps> = (args) => <TestButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Default props
};
