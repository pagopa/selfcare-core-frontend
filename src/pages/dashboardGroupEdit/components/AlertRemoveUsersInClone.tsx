import { Alert, Grid } from '@mui/material';

export default function AlertRemoveUsersInClone() {
  return (
    <Grid item xs={8} mb={3} sx={{ marginTop: 3 }}>
      <Alert
        severity="error"
        sx={{
          background: '#FFFFFF',
          fontSize: '14px',
          width: '626px',
          height: '80px',
          alignItems: 'center',
          color: '#17324D',
          borderLeft: 'solid',
          borderLeftColor: '#FE6666',
          borderLeftWidth: '4px',
        }}
      >
        Alcuni referenti sono stati eliminati dal gruppo duplicato perchè
        <strong> non presenti </strong>
        nel prodotto selezionato o perchè <strong>sospesi</strong>. Puoi comunque assegnare altri
        referenti al gruppo duplicato.
      </Alert>
    </Grid>
  );
}
