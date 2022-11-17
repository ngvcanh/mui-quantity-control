import { ComponentStory } from "@storybook/react";
import QuantityControl from "../quantity-control";

export default {
  title: 'QuantityControl',
  component: QuantityControl
}

const Template: ComponentStory<typeof QuantityControl> = (args) => {

  return <QuantityControl { ...args } />
}

export const Primary = Template.bind({});
Primary.storyName = 'Using';

export const Format = Template.bind({});
Format.args = {
  format: true
}

export const FormatComma = Template.bind({});
FormatComma.args = {
  format: true,
  comma: true
}

export const FormatOnlyBlur = Template.bind({});
FormatOnlyBlur.args = {
  format: true,
  formatOnlyBlur: true
}