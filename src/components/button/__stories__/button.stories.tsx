import { Story, Meta } from "@storybook/react";

import Button, { ButtonProps } from "../button";

export default {
  component: Button,
  title: "Components/Button",
  argTypes: { onClick: { action: "clicked" } },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Click Me",
};
