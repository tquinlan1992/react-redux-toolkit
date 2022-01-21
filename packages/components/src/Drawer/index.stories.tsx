import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Drawer } from '.';

export default {
  title: 'Navigation/Drawer',
  component: Drawer,
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const TextField1 = Template.bind({});
TextField1.args = {
  onClose: () => console.log('on Close'),
};
