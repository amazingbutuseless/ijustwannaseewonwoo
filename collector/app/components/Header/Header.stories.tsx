import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import Header, { HeaderProps } from './index';

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {},
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Home = Template.bind({});
Home.args = {
  title: 'ijustwannaseewonwoo',
};

export const VideoDetails = Template.bind({});
VideoDetails.args = {
  title: 'video title',
};
