import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from '.';

export default {
  title: 'Buttons/Button1',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const TextField1 = Template.bind({});
TextField1.args = {
  children: 'Start',
};
