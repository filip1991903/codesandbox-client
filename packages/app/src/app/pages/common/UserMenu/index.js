import * as React from 'react';
import { inject } from 'mobx-react';

import HoverMenu from 'app/components/HoverMenu';
import Relative from 'common/components/Relative';
import Tooltip from 'common/components/Tooltip';

import Menu from './Menu';
import {
  ClickableContainer,
  ProfileImage,
  ProfileInfo,
  Name,
  Username,
} from './elements';

function UserMenu({ signals, small, user, userMenuOpen }) {
  const smallImage = small || false;

  return (
    <Relative>
      <ClickableContainer onClick={() => signals.userMenuOpened()}>
        <ProfileInfo>
          {user.name && <Name>{user.name}</Name>}
          <Username main={!user.name}>{user.username}</Username>
        </ProfileInfo>

        <Tooltip title="User Menu">
          <ProfileImage
            alt={user.username}
            width={smallImage ? 35 : 40}
            height={smallImage ? 35 : 40}
            src={user.avatarUrl}
          />
        </Tooltip>
      </ClickableContainer>
      {userMenuOpen && (
        <HoverMenu onClose={() => signals.userMenuClosed()}>
          <Menu
            openPreferences={() => {
              signals.modalOpened({ modal: 'preferences' });
            }}
            openStorageManagement={() => {
              signals.files.gotUploadedFiles();
            }}
            signOut={() => {
              signals.signOutClicked();
            }}
            username={user.username}
          />
        </HoverMenu>
      )}
    </Relative>
  );
}

export default inject('signals')(UserMenu);
