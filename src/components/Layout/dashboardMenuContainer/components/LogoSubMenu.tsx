import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { CustomAvatar } from '@pagopa/selfcare-common-frontend';
import { useAppSelector } from '../../../../redux/hooks';
import { partiesSelectors } from '../../../../redux/slices/partiesSlice';

type Props = {
  title: string;
  subTitle?: string;
  color?: string;
};

export default function LogoSubMenu({ title, subTitle, color }: Props) {
  const urlLogo = useAppSelector(partiesSelectors.selectPartySelectedLogo);

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={3}>
          <Box>
            <CustomAvatar customAlt="" customSrc={urlLogo} />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Grid container direction="column">
            <Grid item xs={12} mb={0.5}>
              <Typography variant="h6" sx={{ fontWeight: '700', color: `${color} !important` }}>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" sx={{ fontSize: '14px', color: `${color} !important` }}>
                {subTitle}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
