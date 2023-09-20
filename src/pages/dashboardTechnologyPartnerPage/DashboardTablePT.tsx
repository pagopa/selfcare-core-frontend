import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Trans } from 'react-i18next';
import { DelegationResource } from '../../api/generated/b4f-dashboard/DelegationResource';

type Props = {
  filteredArray: Array<DelegationResource>;
  searchResults: Array<DelegationResource>;
  setSearchResults: React.Dispatch<React.SetStateAction<Array<DelegationResource>>>;
};

export default function DashboardTablePT({
  filteredArray,
  searchResults,
  setSearchResults,
}: Props) {
  const { t } = useTranslation();
  const [orderBy, setOrderBy] = useState<'institutionName' | 'productId'>('institutionName');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const codeToLabelProduct = (code: string) => {
    switch (code) {
      case 'prod-io':
        return 'App Io';
      case 'prod-pagopa':
        return 'Piattaforma pagoPA';
      case 'prod-io, prod-pagopa':
        return 'App Io, Piattaforma pagoPA';

      default:
        return '';
    }
  };

  const handleSort = (field: 'institutionName' | 'productId') => {
    if (field === orderBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(field);
      setOrder('asc');
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('All');

  const handleSearch = () => {
    // eslint-disable-next-line functional/no-let
    let filteredResults = filteredArray;

    if (selectedProduct !== 'All') {
      filteredResults = filteredArray.filter(
        (item) => item.productId && item.productId.includes(selectedProduct)
      );
    }

    filteredResults = filteredResults.filter(
      (item) =>
        item.institutionName &&
        item.institutionName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const hasBeenDelegated = filteredArray && filteredArray.length > 0;

  const handleResetFilter = () => {
    setSearchTerm('');
    setSelectedProduct('All');
    setSearchResults(filteredArray);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <TextField
            label={t('overview.ptPage.filterTechPartner.textfieldLabel')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={!hasBeenDelegated}
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <FormControl fullWidth={true} size="small">
            <InputLabel> {t('overview.ptPage.filterTechPartner.productSelectLabel')}</InputLabel>
            <Select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value as string)}
              disabled={!hasBeenDelegated}
              label={t('overview.ptPage.filterTechPartner.productSelectLabel')}
            >
              <MenuItem value="All">
                {t('overview.ptPage.filterTechPartner.allProductsLabel')}
              </MenuItem>
              <MenuItem value="prod-io">{codeToLabelProduct('prod-io')}</MenuItem>
              <MenuItem value="prod-pagopa">{codeToLabelProduct('prod-pagopa')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="outlined"
            onClick={handleSearch}
            disabled={!hasBeenDelegated}
            size="small"
          >
            {t('overview.ptPage.filterTechPartner.buttonLabel')}
          </Button>
        </Grid>
        <Grid item xs={1}>
          <ButtonNaked
            onClick={handleResetFilter}
            color="primary"
            variant="text"
            disabled={!hasBeenDelegated || (!searchTerm && selectedProduct === 'All')}
            sx={{ textAlign: 'center' }}
            component="button"
          >
            {t('overview.ptPage.filterTechPartner.resetFilter')}
          </ButtonNaked>
        </Grid>
      </Grid>
      {!hasBeenDelegated ? null : searchResults.length > 0 ? (
        <TableContainer sx={{ height: '100%', overflow: 'hidden' }}>
          <Table sx={{ minWidth: 'auto', height: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sortDirection={'asc'}>
                  {t('overview.ptPage.headerPtTableLabels.party')}
                  <IconButton
                    style={{ backgroundColor: 'transparent', padding: '0 8px' }}
                    disableRipple
                    onClick={() => handleSort('institutionName')}
                  >
                    {orderBy === 'institutionName' ? (
                      order === 'asc' ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      )
                    ) : (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>{t('overview.ptPage.headerPtTableLabels.product')}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: 'background.paper' }}>
              {searchResults.map((item) => (
                <TableRow key={item.institutionName}>
                  <TableCell>
                    <Typography sx={{ fontWeight: '700' }}>{item.institutionName}</Typography>
                  </TableCell>
                  <TableCell>{codeToLabelProduct(item.productId as string)}</TableCell>
                  <TableCell width={'20%'}>
                    <Typography>-</Typography>
                  </TableCell>
                  <TableCell width={'20%'}>
                    <Typography>-</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography width={'10%'}></Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid
          width={'100%'}
          xs={12}
          mt={5}
          sx={{
            display: 'flex',
            padding: '16px',
            backgroundColor: 'background.paper',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <SentimentDissatisfiedIcon />
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            <Trans i18nKey="overview.ptPage.filterTechPartner.emptyFilterResult">
              I filtri che hai applicato non hanno dato nessun risultato.
              <ButtonNaked
                color="primary"
                onClick={handleResetFilter}
                sx={{ ml: '4px' }}
                size="medium"
              >
                Rimuovi filtri
              </ButtonNaked>
            </Trans>
          </Typography>
        </Grid>
      )}
    </>
  );
}
