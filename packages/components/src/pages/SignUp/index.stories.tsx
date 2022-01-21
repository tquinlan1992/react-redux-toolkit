import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SignUpPage } from './';

export default {
  title: 'Pages/SignUp',
} as ComponentMeta<typeof SignUpPage>;

const Template: ComponentStory<typeof SignUpPage> = (args: any) => <SignUpPage {...args} />;

export const SignUpPage1 = Template.bind({});
SignUpPage1.args = {};
