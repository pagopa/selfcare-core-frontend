import React from 'react';
import { Typography, Button, Box, Grid, Badge, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = {
  cardTitle: string;
  cardSubTitle?: string;
  buttonLabel: string;
  disableBtn: boolean;
  logoCard?: string;
  tag?: string;
  btnAction?: () => void;
  heightLogo?:string;
  heightTitle?:string;
  heightSubTitle?:string;
  heightButton?:string;
};

const CustomBadge = styled(Badge)({
  '.MuiBadge-badge': {
    backgroundColor: '#00C5CA',
    color: '#17324D',
    fontWeight: '600',
  },
});

export default function BaseProductCard({
  cardTitle,
  cardSubTitle,
  buttonLabel,
  disableBtn,
  logoCard,
  tag,
  btnAction,
  heightLogo,
  heightTitle,
  heightSubTitle,
  heightButton
}: Props) {
  return (
    <React.Fragment>
      <Card sx={{ border: 'none', boxShadow: 'none' }}>
        <CardContent>
          {/* TODO: to verify if is a direct img or an url */}
          <Grid container height={heightLogo}>
            <Grid item xs={6} mb={3}>
              <Box sx={{ width: '100%' }}>
                <img src={`data:image/png;base64,${logoCard}`} />
              </Box>
            </Grid>
            {tag && (
              <Grid item xs={6}>
                <CustomBadge badgeContent={tag} sx={{ minWidth: '113px' }} />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} height={heightTitle} display='flex' alignItems={'center'}>
              {cardTitle && <Typography variant="h2" sx={{ color: '#17324D' }}>
                {cardTitle}
              </Typography>}
          </Grid>
          <Grid item xs={12} mb={3} height={heightSubTitle} display='flex' alignItems={'center'}>
            {cardSubTitle && <Typography variant="body2" sx={{ fontSize: '18px' }}>
                {cardSubTitle}
              </Typography>}
          </Grid>

          <Grid item xs={12} justifyContent="center" height={heightButton} >
            <Box sx={{width: '100%'}}>
              <Button
                onClick={btnAction}
                disabled={disableBtn}
                variant="contained"
                sx={{ width: '100%', height: '48px' }}
              >
                {buttonLabel}
              </Button>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
