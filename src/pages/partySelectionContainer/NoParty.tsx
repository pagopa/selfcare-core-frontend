import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ENV } from '../../utils/env';

export default function NoParty() {
  const bodyTitle = 'Il tuo profilo non è associato a nessun Ente.';
  const bodyDescription =
    'Per accedere, chiedi al Referente incaricato di aggiungerti al portale Self Care del tuo Ente.';

  return (
    <React.Fragment>
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
          <Grid item xs={4}>
            <Box>
              <Typography variant="h3" component="h2">
                {bodyTitle}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item container justifyContent="center">
          <Grid item xs={4}>
            <Box>
              <Typography variant="subtitle2" component="h2">
                {bodyDescription}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={2} mt={4}>
          <Button
            variant="contained"
            sx={{ width: '190px', height: '40px' }}
            onClick={() => window.location.assign(ENV.URL_FE.LANDING)}
          >
            Torna alla Home
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
