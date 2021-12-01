import { Box } from '@mui/system';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { partiesSelectors } from '../../redux/slices/partiesSlice';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import DashboardMenuContainer from './dashboardMenuContainer/DashboardMenuContainer';

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const party = useAppSelector(partiesSelectors.selectPartySelected);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header withSecondHeader={true} subHeaderChild={party && <DashboardMenuContainer />} />
      <Box sx={{ height: '100%' }}>{children}</Box>
      <Footer />
    </Box>
  );
}
