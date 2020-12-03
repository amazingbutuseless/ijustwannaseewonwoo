import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import HomePage, { HomePageProps } from './HomePage';

export default {
  title: 'Page/Home',
  component: HomePage,
  argTypes: {},
} as Meta;

const Template: Story<HomePageProps> = (args) => <HomePage {...args} />;

export const Default = Template.bind({});
Default.args = {};
