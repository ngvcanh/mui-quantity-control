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
