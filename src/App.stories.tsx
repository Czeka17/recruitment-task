import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import  App from './App'; 
export default {
  title: 'App',
  component: App,
} as Meta;

const Template: StoryFn = (args) => <App {...args} />;

export const AppStates = Template.bind({});
AppStates.args = {
  isLoading: true,
  error: false,
  sortBy: 'name',
  sortOrder: 'ascending',
  numElements:15
};
