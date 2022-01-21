import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TextField } from '.';

export default {
  title: 'Forms/TextField',
  component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const TextField1 = Template.bind({});
TextField1.args = {
  label: 'label',
};
