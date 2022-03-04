import React, { useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { useHistory } from 'react-router';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { Party } from '../../../model/Party';
import PartySelectionSearch from '../../../components/partySelectionSearch/PartySelectionSearch';
import ROUTES from '../../../routes';
import { useAppDispatch } from '../../../redux/hooks';
import { partiesActions } from '../../../redux/slices/partiesSlice';
import PartySelectionTitle from './components/PartySelectionTitle';

type Props = {
  parties: Array<Party>;
};

export default function PartySelection({ parties }: Props) {
  const bodyTitle = 'Seleziona il tuo Ente';
  const bodyDescription =
    "Se operi per più Enti, puoi modificare la tua scelta all'interno del portale.";

  const [selectedParty, setSelectedParty] = React.useState<Party | null>();
  const [disableBtn, setBtnDisable] = React.useState(true);
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(partiesActions.setPartySelected(undefined));
    dispatch(partiesActions.setPartySelectedProducts(undefined));
  }, []);

  return (
    <Grid
      direction="column"
      container
      display="flex"
      justifyContent="center"
      spacing={2}
      my={'auto'}
      sx={{ textAlign: 'center' }}
    >
      <Grid item container justifyContent="center">
        <Grid item xs={8}>
          <PartySelectionTitle bodyTitle={bodyTitle} bodyDescription={bodyDescription} />
        </Grid>
      </Grid>

      <Grid item display="flex" justifyContent="center">
        <Grid container item xs={3} md={4} lg={3}>
          <PartySelectionSearch
            parties={parties}
            onPartySelectionChange={(selectedParty: Party | null) => {
              setBtnDisable(selectedParty === null);
              setSelectedParty(selectedParty);
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          disabled={disableBtn}
          sx={{ width: '190px', height: '40px' }}
          onClick={() =>
           { 
            trackEvent('DASHBOARD_PARTY_SELECTION', { party_id: selectedParty?.institutionId });
             history.push(
              resolvePathVariables(ROUTES.PARTY_DASHBOARD.path, {
                institutionId: selectedParty?.institutionId ?? '',
              })
            );}
          }
        >
          Entra
        </Button>
      </Grid>
    </Grid>
  );
}
