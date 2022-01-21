import { ComponentMeta, ComponentStory } from '@storybook/react';

import { WebsitePage } from '.';

export default {
  title: 'Pages/Website',
} as ComponentMeta<typeof WebsitePage>;

const Template: ComponentStory<typeof WebsitePage> = (args: any) => <WebsitePage {...args} />;

export const SignUpPage1 = Template.bind({});
SignUpPage1.args = {
  onGetStartedPath: 'http://localhost:8000/',
};
