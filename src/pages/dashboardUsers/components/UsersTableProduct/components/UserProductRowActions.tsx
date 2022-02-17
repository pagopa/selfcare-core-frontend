import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import { PartyUser, PartyUserProduct } from '../../../../../model/PartyUser';
import { Party, UserStatus } from '../../../../../model/Party';
import { LOADING_TASK_ACTION_ON_PARTY_USER } from '../../../../../utils/constants';
import { deletePartyUser, updatePartyUserStatus } from '../../../../../services/usersService';

type Props = {
  party: Party;
  partyUser: PartyUser;
  partyUserProduct: PartyUserProduct;
  onDelete: (partyUser: PartyUser) => void;
};

const ITEM_HEIGHT = 48;

export default function UserProductRowActions({
  party,
  partyUser,
  partyUserProduct,
  onDelete,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();

  const setLoading = useLoading(LOADING_TASK_ACTION_ON_PARTY_USER);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const askConfirm = (title: string, actionMessage: string, onConfirm: () => void) => {
    addNotify({
      id: `CONFIRM_ACTION_${title}_ON_${partyUser.id}`,
      title,
      message: (
        <>
          {actionMessage}
          <strong>{`${partyUser.name} ${partyUser.surname}`}</strong>
          {'.'}
          <br />
          {'Vuoi continuare?'}
        </>
      ),
      onConfirm,
      confirmLabel: 'Conferma',
    });
  };

  const performAction = (
    action: () => Promise<void>,
    title: string,
    actionMessage: string,
    onComplete: () => void
  ) => {
    setLoading(true);
    action()
      .then((_) => {
        addNotify({
          id: 'ACTION_ON_PARTY_USER_COMPLETED',
          title,
          message: (
            <>
              {actionMessage}
              <strong>{`${partyUser.name} ${partyUser.surname}`}</strong>
              {'.'}
            </>
          ),
          component: 'Toast',
        });

        onComplete();
      })
      .catch((reason) =>
        addError({
          id: 'ACTION_ON_PARTY_USER_ERROR',
          blocking: false,
          error: reason,
          techDescription: `An error occurred while performing action ${title} on party (${party.institutionId}) and user (${partyUser.id})`,
          toNotify: true,
        })
      )
      .finally(() => setLoading(false));
  };

  const handleChangeState = () => {
    handleClose();

    const nextStatus: UserStatus | undefined =
      partyUser.status === 'ACTIVE'
        ? 'SUSPENDED'
        : partyUser.status === 'SUSPENDED'
        ? 'ACTIVE'
        : undefined;
    if (!nextStatus) {
      addError({
        id: 'INVALID_STATUS_TRANSITION',
        blocking: false,
        error: new Error('INVALID_STATUS_TRANSITION'),
        techDescription: `Invalid status transition while updating party (${party.institutionId}) user (${partyUser.id}): ${partyUser.status}`,
        toNotify: true,
      });

      return;
    }

    askConfirm(
      nextStatus === 'SUSPENDED' ? 'Sospendi Referente' : 'Riabilita Referente',
      nextStatus === 'SUSPENDED' ? 'Stai per sospendere ' : 'Stai per riabilitare ',
      () => updateStatus(nextStatus)
    );
  };

  const updateStatus = (nextStatus: UserStatus) => {
    const selectedUserStatus = nextStatus === 'SUSPENDED' ? 'sospeso' : 'riabilitato';
    performAction(
      () =>
        updatePartyUserStatus(
          party,
          partyUser,
          partyUserProduct,
          partyUserProduct.roles[0],
          nextStatus
        ),
      `REFERENTE ${selectedUserStatus.toUpperCase()}`,
      `Hai ${selectedUserStatus} correttamente `,
      // eslint-disable-next-line functional/immutable-data
      () => (partyUser.status = nextStatus)
    );
  };

  const handleDelete = () => {
    handleClose();
    askConfirm('Elimina Referente', 'Stai per eliminare ', deleteParty);
  };

  const deleteParty = () => {
    performAction(
      () => deletePartyUser(party, partyUser, partyUserProduct, partyUserProduct.roles[0]),
      'REFERENTE ELIMINATO',
      'Hai eliminato correttamente ',
      () => onDelete(partyUser)
    );
  };

  const handleModify = () => {
    handleClose();
    history.push(
      resolvePathVariables('' /* TODO use route to modify user registry */, {
        institutionId: party.institutionId,
        userId: partyUser.id,
      })
    );
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon color="primary" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleModify}>Modifica</MenuItem>
        <MenuItem onClick={handleChangeState}>
          {partyUser.status === 'ACTIVE'
            ? 'Sospendi'
            : partyUser.status === 'SUSPENDED'
            ? 'Riabilita'
            : ''}
        </MenuItem>
        <MenuItem onClick={handleDelete}>Elimina</MenuItem>
      </Menu>
    </div>
  );
}
