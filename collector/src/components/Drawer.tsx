import React, { ReactElement, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { DrawerWrapper, DrawerBackground } from './Drawer.style';

export default function Drawer({ children }): ReactElement {
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  const onExpandButtonClick = () => {
    setExpanded(!expanded);
  };

  const onBackgroundClick = () => {
    setExpanded(false);
  };

  const onLinkClick = (e) => {
    e.preventDefault();

    history.push(e.target.pathname);
    setExpanded(false);
  };

  return (
    <>
      <DrawerWrapper expanded={expanded}>
        <button onClick={onExpandButtonClick}>
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="32px"
              height="32px"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              {expanded && (
                <path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z" />
              )}
              {!expanded && <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />}
            </svg>
            <span>Expand Panel</span>
          </>
        </button>

        <ul>
          <li>
            <a href="/" onClick={onLinkClick}>
              Home
            </a>
          </li>
          <li>
            <a href="/playlist" onClick={onLinkClick}>
              Playlist
            </a>
          </li>
          <li>
            <a href="/video" onClick={onLinkClick}>
              Video
            </a>
          </li>
        </ul>

        <div>
          {children}
          <br />
          <a href="/about" onClick={onLinkClick}>
            ijustwannaseewonwoo
          </a>
        </div>
      </DrawerWrapper>
      <DrawerBackground expanded={expanded} onClick={onBackgroundClick} />
    </>
  );
}
