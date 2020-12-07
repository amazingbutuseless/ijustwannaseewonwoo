import React from 'react';

import { Meta } from '@storybook/react/types-6-0';
import ChannelItem, { ChannelItemProps } from './index';

export default {
  title: 'Components/ChannelItem',
  component: ChannelItem,
  args: {
    id: 'UCfkXDY7vwkcJ8ddFGz8KusA',
    title: 'SEVENTEEN',
    thumbnails: {
      default:
        'https://yt3.ggpht.com/ytc/AAUvwni1P_P6SdXl1INaWSScLVy-5TNyE3XI5nwQ_mF04Q=s88-c-k-c0x00ffffff-no-rj-mo',
      high:
        'https://yt3.ggpht.com/ytc/AAUvwni1P_P6SdXl1INaWSScLVy-5TNyE3XI5nwQ_mF04Q=s800-c-k-c0x00ffffff-no-rj-mo',
    },
  },
} as Meta;

export function Default({ ...args }: ChannelItemProps): JSX.Element {
  const onClick = (channelId: string) => {
    console.log(`Channel ${channelId}`);
  };

  return <ChannelItem {...args} onClick={onClick} />;
}
