import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { DrawerBackground, DrawerWrapper, DrawerNavigation } from './Drawer.style';

import Item from './DrawerItem';
import ExpandButton from './DrawerExpandButton';
import UserMenu from './DrawerUserMenu';

interface DrawerProps {
  children: ReactElement;
}

export default function Drawer({ children }: DrawerProps): ReactElement {
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  const onExpandButtonClick = () => {
    setExpanded(!expanded);
  };

  const onBackgroundClick = () => {
    setExpanded(false);
  };

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    history.push((e.target as HTMLAnchorElement).pathname);
    setExpanded(false);
  };

  return (
    <>
      <DrawerWrapper expanded={expanded}>
        <ExpandButton expanded={expanded} onClick={onExpandButtonClick} />

        <DrawerNavigation>
          <Item key="featured" title="Featured" link="/" onClick={onLinkClick} />
          <Item key="channel" title="Channel" link="/channel" onClick={onLinkClick} />
          <Item key="playlist" title="Playlist" link="/playlist" onClick={onLinkClick} />
          <Item key="video" title="Video" link="/video" onClick={onLinkClick} />
        </DrawerNavigation>

        <UserMenu onLinkClick={onLinkClick}>{children}</UserMenu>
      </DrawerWrapper>

      <DrawerBackground expanded={expanded} onClick={onBackgroundClick} />
    </>
  );
}
