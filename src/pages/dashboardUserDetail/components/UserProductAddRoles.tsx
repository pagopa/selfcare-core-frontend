import { Box, Checkbox, FormControlLabel, Link, Typography } from '@mui/material';
import SessionModal from '@pagopa/selfcare-common-frontend/components/SessionModal';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import { useEffect, useState } from 'react';
import { Party } from '../../../model/Party';
import { PartyUser, PartyUserProduct } from '../../../model/PartyUser';
import { Product } from '../../../model/Product';
import { ProductRolesLists } from '../../../model/ProductRole';
import { savePartyUser } from '../../../services/usersService';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';

type Props = {
  party: Party;
  user: PartyUser;
  fetchPartyUser: () => void;
  userProduct: PartyUserProduct;
  product: Product;
  productRolesList: ProductRolesLists;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function UserProductAddRoles({
  party,
  user,
  userProduct,
  product,
  fetchPartyUser,
  productRolesList,
}: Props) {
  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);
  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();

  const [selectedRoles, setSelectedRoles] = useState<Array<string>>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelectedRoles(userProduct.roles.map((r) => r.role));
  }, [userProduct.roles]);

  const onAddMultiRole = () => {
    setOpen(false);
    setLoading(true);
    savePartyUser(party, product, {
      ...user,
      productRoles: selectedRoles ?? [],
      confirmEmail: user.email,
    })
      .then((_) => {
        const newRolesTitles = selectedRoles
          ?.filter((r) => !userProduct.roles.find((ur) => ur.role === r))
          .map((r) => productRolesList.groupByProductRole[r].title);
        addNotify({
          component: 'Toast',
          id: 'ADD_MULTI_ROLE_USER',
          title: 'RUOLO AGGIUNTO',
          message: (
            <>
              {'Hai aggiunto correttamente '}
              {newRolesTitles?.length === 1 ? 'il ruolo' : 'i ruoli'}
              {` ${newRolesTitles?.join(',')} `}
              {' per il referente '}
              <strong>{`${user.name} ${user.surname}`}</strong>
            </>
          ),
        });
        fetchPartyUser();
      })
      .catch((error) =>
        addError({
          component: 'Toast',
          id: `ADD_MULTI_ROLE_USER_ERROR-${user.id}`,
          displayableTitle: "ERRORE DURANTE L'AGGIUNTA",
          techDescription: `C'è stato un errore durante l'aggiunta del ruolo per il referente ${user.name} ${user.surname}`,
          blocking: false,
          error,
          toNotify: true,
          displayableDescription: (
            <>
              {"C'è stato un errore durante l'aggiunta del ruolo per il referente "}
              <strong>{`${user.name} ${user.surname}`}</strong>.
            </>
          ),
        })
      )
      .finally(() => setLoading(false));
  };

  const selcRoleProductRoleList = productRolesList.groupBySelcRole[userProduct.roles[0].selcRole];
  return userProduct.roles.length < selcRoleProductRoleList.length &&
    selcRoleProductRoleList[0].multiroleAllowed ? (
    <>
      <Link
        onClick={() => {
          setOpen(true);
        }}
        component="button"
      >
        <Typography variant="h3" sx={{ fontSize: '16px', color: '#0073E6' }}>
          + Assegna ruolo
        </Typography>
      </Link>
      <SessionModal
        open={open}
        title="Assegna ruolo"
        message={
          <>
            {'Assegna a '}
            <strong> {`${user.name} ${user.surname}`} </strong>
            {'un altro ruolo '}
            <strong> {`${user.userRole}`} </strong>
            {' sul prodotto '}
            <strong> {`${product.title}:`} </strong>

            {Object.values(productRolesList.groupBySelcRole[userProduct.roles[0].selcRole]).map(
              (p) => {
                const isSelected = (selectedRoles?.indexOf(p.productRole) ?? -1) > -1;
                const isDisabled =
                  (userProduct.roles.map((u) => u.role).indexOf(p.productRole) ?? -1) > -1;
                return (
                  <Box key={p.productRole}>
                    <FormControlLabel
                      sx={{ marginTop: 2, marginBottom: 2 }}
                      checked={isSelected}
                      disabled={isDisabled}
                      value={p.productRole}
                      control={<Checkbox />}
                      label={
                        <>
                          <Typography> {p.title} </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 400,
                              fontSize: '12px',
                              color: '#5C6F82',
                            }}
                          >
                            {p.description}
                          </Typography>
                        </>
                      }
                      onChange={
                        isDisabled
                          ? undefined
                          : () =>
                              setSelectedRoles(
                                isSelected
                                  ? selectedRoles?.filter((s) => s !== p.productRole)
                                  : selectedRoles?.concat([p.productRole])
                              )
                      }
                    />
                  </Box>
                );
              }
            )}
          </>
        }
        onConfirm={onAddMultiRole}
        onConfirmEnabled={selectedRoles.length > userProduct.roles.length}
        handleClose={() => setOpen(false)}
        onConfirmLabel="Conferma"
        onCloseLabel="Annulla"
      />
    </>
  ) : (
    <> </>
  );
}
