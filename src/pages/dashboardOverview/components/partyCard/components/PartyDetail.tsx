/* eslint-disable complexity */ // TODO: remove eslint-disable complexity (add sub component)
import { Grid, Tooltip, Typography, useTheme } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { SessionModal, useErrorDispatcher, useLoading } from '@pagopa/selfcare-common-frontend';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { Party } from '../../../../../model/Party';
import { LOADING_TASK_SAVE_PARTY_GEOTAXONOMIES } from '../../../../../utils/constants';
import { DashboardApi } from '../../../../../api/DashboardApiClient';
import { ENV } from '../../../../../utils/env';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { partiesActions, partiesSelectors } from '../../../../../redux/slices/partiesSlice';
import { GeographicTaxonomyResource } from '../../../../../api/generated/b4f-dashboard/GeographicTaxonomyResource';
import { GeographicTaxonomyDto } from '../../../../../api/generated/b4f-dashboard/GeographicTaxonomyDto';
import GeoTaxonomySection from './GeoTaxonomySection';

type Props = {
  party: Party;
};

const labelStyles = {
  color: 'text.colorTextPrimary',
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function PartyDetail({ party }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();

  const setLoadingSaveGeotaxonomies = useLoading(LOADING_TASK_SAVE_PARTY_GEOTAXONOMIES);
  const addError = useErrorDispatcher();
  const dispatch = useAppDispatch();

  const [openModalAddNewGeographicTaxonomies, setOpenModalAddNewGeographicTaxonomies] =
    useState<boolean>(false);
  const [openModalFirstTimeAddGeographicTaxonomies, setOpenModalFirstTimeAddGeographicTaxonomies] =
    useState<boolean>(false);
  const [optionsSelected, setOptionsSelected] = useState<Array<GeographicTaxonomyResource>>(
    party.geographicTaxonomies ? party.geographicTaxonomies : [{ code: '', desc: '' }]
  );
  const [isAddNewAutocompleteEnabled, setIsAddNewAutocompleteEnabled] = useState<boolean>(false);
  const setPartyUpdated = (partyUpdated: Party) => {
    dispatch(partiesActions.setPartySelected(partyUpdated));
  };

  const showGeoTax = party.institutionType && !['PT', 'SA', 'AS'].includes(party.institutionType);

  const partyUpdated = useAppSelector(partiesSelectors.selectPartySelected);
  useEffect(() => {
    if (
      ENV.GEOTAXONOMY.SHOW_GEOTAXONOMY &&
      (!party.geographicTaxonomies || party?.geographicTaxonomies?.length === 0) &&
      showGeoTax
    ) {
      setOpenModalFirstTimeAddGeographicTaxonomies(true);
    } else if (party.geographicTaxonomies && party?.geographicTaxonomies?.length > 0) {
      setOptionsSelected(party?.geographicTaxonomies);
    } else {
      setOptionsSelected([{ code: '', desc: '' }]);
    }
  }, [party]);

  useEffect(() => {
    if (partyUpdated && party.partyId) {
      setPartyUpdated(partyUpdated);
    }
  }, [partyUpdated, party.partyId]);

  const infoStyles = {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.fontSize,
  };

  const institutionTypeTranscode = (institutionType: any) =>
    t(`overview.partyDetail.institutionTypeValue.${institutionType}`);
  const showTooltipAfter = 49;
  const lastPartyVatNumber = party.products[party.products.length - 1]?.billing?.vatNumber;
  const isTaxCodeEquals2Piva = party.fiscalCode === lastPartyVatNumber;

  const isInstitutionTypePA = party.institutionType === 'PA';

  const handleAddNewTaxonomies = () => {
    setLoadingSaveGeotaxonomies(true);
    DashboardApi.updateInstitutionGeographicTaxonomy(
      party.partyId as string,
      optionsSelected as ReadonlyArray<GeographicTaxonomyDto>
    )
      .then(() => {
        trackEvent('UPDATE_PARTY_GEOGRAPHIC_TAXONOMIES', {
          geographic_taxonomies: optionsSelected,
        });
        setPartyUpdated({ ...party, geographicTaxonomies: optionsSelected });
      })
      .catch((reason: any) =>
        addError({
          id: 'UNSUCCESS_SAVE_TAXONOMIES_INFO',
          blocking: false,
          techDescription: `An error occured while saving geotaxonomies info for party id ${party.partyId}`,
          toNotify: false,
          error: reason,
        })
      )
      .finally(() => {
        setLoadingSaveGeotaxonomies(false);
        setOpenModalAddNewGeographicTaxonomies(false);
        setOpenModalFirstTimeAddGeographicTaxonomies(false);
      });
  };
  const isAooUo = party.subunitType === 'AOO' || party.subunitType === 'UO';

  return (
    <>
      <Grid container alignItems={'flex-start'} wrap="nowrap">
        <Grid container item xs={12} alignItems={'flex-start'} spacing={1} pr={2}>
          {/* institutionType */}
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ ...labelStyles }}>
              {t('overview.partyDetail.institutionType')}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Tooltip
              title={
                institutionTypeTranscode(party.institutionType).length >= showTooltipAfter
                  ? institutionTypeTranscode(party.institutionType)
                  : ''
              }
              placement="top"
              arrow={true}
            >
              <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
                {institutionTypeTranscode(party.institutionType)}
              </Typography>
            </Tooltip>
          </Grid>
          {/* category */}
          {party.category && (
            <>
              <Grid item xs={2}>
                <Typography variant="body2" sx={{ ...labelStyles }}>
                  {t('overview.partyDetail.category')}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Tooltip
                  title={party.category.length >= showTooltipAfter ? party.category : ''}
                  placement="top"
                  arrow={true}
                >
                  <Typography
                    sx={{ ...infoStyles, maxWidth: '100% !important' }}
                    className="ShowDots"
                  >
                    {party.category}
                  </Typography>
                </Tooltip>
              </Grid>
            </>
          )}
          {/* {structure} */}
          {isAooUo && (
            <>
              <Grid item xs={2}>
                <Typography variant="body2" sx={{ ...labelStyles }}>
                  {t('overview.partyDetail.structure')}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Tooltip
                  title={
                    institutionTypeTranscode(party.institutionType).length >= showTooltipAfter
                      ? institutionTypeTranscode(party.institutionType)
                      : ''
                  }
                  placement="top"
                  arrow={true}
                >
                  <Typography
                    sx={{ ...infoStyles, maxWidth: '100% !important' }}
                    className="ShowDots"
                  >
                    {party.subunitType === 'AOO'
                      ? 'Area Organizzativa Omogenea'
                      : party.subunitType === 'UO'
                      ? 'Unità Organizzativa'
                      : ''}
                  </Typography>
                </Tooltip>
              </Grid>
            </>
          )}
          {/* geographicTaxonomy */}
          {ENV.GEOTAXONOMY.SHOW_GEOTAXONOMY && showGeoTax && (
            <>
              {
                <Grid item xs={2}>
                  <Typography component="span" variant="body2" sx={{ ...labelStyles }}>
                    {t('overview.partyDetail.geographicTaxonomies.label')}
                  </Typography>
                </Grid>
              }
              <Grid item xs={4}>
                <Tooltip
                  title={
                    partyUpdated?.description && partyUpdated.description.length >= showTooltipAfter
                      ? partyUpdated.description
                      : ''
                  }
                  placement="top"
                  arrow={true}
                >
                  <Typography
                    sx={{
                      ...infoStyles,
                      maxWidth: '100% !important',
                      textTransform: 'capitalize',
                    }}
                    className="ShowDots"
                    component="span"
                  >
                    {partyUpdated?.geographicTaxonomies
                      ? partyUpdated?.geographicTaxonomies[0]?.desc?.toLocaleLowerCase()
                      : '-'}
                    {partyUpdated?.geographicTaxonomies &&
                      partyUpdated.geographicTaxonomies.length >= 1 && (
                        <>
                          {partyUpdated.geographicTaxonomies.length !== 1 ? ', ' : undefined}
                          <ButtonNaked
                            component="button"
                            onClick={() => setOpenModalAddNewGeographicTaxonomies(true)}
                            endIcon={<EditIcon />}
                            sx={{ color: 'primary.main', flexDirection: 'row' }}
                            weight="default"
                          >
                            {partyUpdated?.geographicTaxonomies.length !== 1
                              ? '+' + `${partyUpdated.geographicTaxonomies.length - 1}`
                              : undefined}
                          </ButtonNaked>
                        </>
                      )}
                  </Typography>
                </Tooltip>
              </Grid>
            </>
          )}
          {/* companyName */}
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ ...labelStyles }}>
              {t(
                isAooUo ? 'overview.partyDetail.denomination' : 'overview.partyDetail.companyName'
              )}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Tooltip
              title={
                party.description && party.description.length >= showTooltipAfter
                  ? party.description
                  : ''
              }
              placement="top"
              arrow={true}
            >
              <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
                {party.description}
              </Typography>
            </Tooltip>
          </Grid>
          {/* origin (ipa code) */}
          {isInstitutionTypePA && !isAooUo ? (
            <>
              <Grid item xs={2}>
                <Typography variant="body2" sx={{ ...labelStyles }}>
                  {t('overview.partyDetail.originId')}&nbsp;{party.origin}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Tooltip
                  title={
                    party.originId && party.originId.length >= showTooltipAfter
                      ? party.originId
                      : ''
                  }
                  placement="top"
                  arrow={true}
                >
                  <Typography
                    sx={{ ...infoStyles, maxWidth: '100% !important' }}
                    className="ShowDots"
                  >
                    {party.originId}
                  </Typography>
                </Tooltip>
              </Grid>
            </>
          ) : isAooUo ? (
            <>
              <Grid item xs={2}>
                <Typography variant="body2" sx={{ ...labelStyles }}>
                  {t('overview.partyDetail.uniqueCode')}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Tooltip
                  title={
                    party.originId && party.originId.length >= showTooltipAfter
                      ? party.originId
                      : ''
                  }
                  placement="top"
                  arrow={true}
                >
                  <Typography
                    sx={{ ...infoStyles, maxWidth: '100% !important' }}
                    className="ShowDots"
                  >
                    {party.subunitCode}
                  </Typography>
                </Tooltip>
              </Grid>
            </>
          ) : undefined}
          {/* vatNumberGroup */}
          {party.institutionType === 'PSP' && (
            <>
              <Grid item xs={2}>
                <Typography variant="body2" sx={{ ...labelStyles }}>
                  {t('overview.partyDetail.vatNumberGroup')}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{ ...infoStyles, maxWidth: '100% !important' }}
                  className="ShowDots"
                >
                  {party.vatNumberGroup === true
                    ? t('overview.partyDetail.vatNumberGroupValues.yes')
                    : t('overview.partyDetail.vatNumberGroupValues.no')}
                </Typography>
              </Grid>
            </>
          )}

          {/* fiscalCode */}
          {isInstitutionTypePA && isTaxCodeEquals2Piva && party.fiscalCode && (
            <>
              <Grid item xs={2}>
                <Typography variant="body2" sx={{ ...labelStyles }}>
                  {isTaxCodeEquals2Piva
                    ? t('overview.partyDetail.isTaxCodeEquals2Piva')
                    : t('overview.partyDetail.fiscalCode')}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Tooltip
                  title={
                    party.fiscalCode && party.fiscalCode.length >= showTooltipAfter
                      ? party.fiscalCode
                      : ''
                  }
                  placement="top"
                  arrow={true}
                >
                  <Typography
                    sx={{ ...infoStyles, maxWidth: '100% !important' }}
                    className="ShowDots"
                  >
                    {party.fiscalCode}
                  </Typography>
                </Tooltip>
              </Grid>
            </>
          )}
          <>
            {/* vatNumber */}
            {!isTaxCodeEquals2Piva && lastPartyVatNumber && (
              <>
                <Grid item xs={2}>
                  <Typography variant="body2" sx={{ ...labelStyles }}>
                    {t('overview.partyDetail.vatNumber')}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Tooltip
                    title={
                      lastPartyVatNumber && lastPartyVatNumber.length >= showTooltipAfter
                        ? lastPartyVatNumber
                        : ''
                    }
                    placement="top"
                    arrow={true}
                  >
                    <Typography
                      sx={{ ...infoStyles, maxWidth: '100% !important' }}
                      className="ShowDots"
                    >
                      {lastPartyVatNumber}
                    </Typography>
                  </Tooltip>
                </Grid>
              </>
            )}
          </>

          {/* pecEmail */}
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ ...labelStyles }}>
              {t('overview.partyDetail.pec')}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{}}>
            <Tooltip
              title={
                party.digitalAddress && party.digitalAddress.length >= showTooltipAfter
                  ? party.digitalAddress
                  : ''
              }
              placement="top"
              arrow={true}
            >
              <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
                {party.digitalAddress}
              </Typography>
            </Tooltip>
          </Grid>
          {/* registeredOffice  */}
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ ...labelStyles }}>
              {t('overview.partyDetail.registeredOffice')}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Tooltip
              title={
                party.registeredOffice.length >= showTooltipAfter ? party.registeredOffice : ''
              }
              placement="top"
              arrow={true}
            >
              <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
                {party.zipCode
                  ? party.registeredOffice + ' - ' + party.zipCode
                  : party.registeredOffice}
              </Typography>
            </Tooltip>
          </Grid>
          {/* aooParentCode */}
          {party.aooParentCode &&
            party.subunitType === 'UO' && ( // TODO: change logic if party.aooParentCode is present
              <>
                <Grid item xs={2}>
                  <Typography variant="body2" sx={{ ...labelStyles }}>
                    {t('overview.partyDetail.aooParentCode')}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    sx={{ ...infoStyles, maxWidth: '100% !important' }}
                    className="ShowDots"
                  >
                    {party.aooParentCode}
                  </Typography>
                </Grid>
              </>
            )}
        </Grid>
      </Grid>
      <SessionModal
        open={openModalFirstTimeAddGeographicTaxonomies}
        title={t(
          'overview.partyDetail.geographicTaxonomies.firstTimeInsertGeographicTaxonomiesModal.title'
        )}
        message={
          <GeoTaxonomySection
            geographicTaxonomies={partyUpdated?.geographicTaxonomies}
            notFoundAnyTaxonomies={openModalFirstTimeAddGeographicTaxonomies}
            setOptionsSelected={setOptionsSelected}
            setIsAddNewAutocompleteEnabled={setIsAddNewAutocompleteEnabled}
            optionsSelected={optionsSelected}
            isAddNewAutocompleteEnabled={isAddNewAutocompleteEnabled}
          />
        }
        onConfirmLabel={t(
          'overview.partyDetail.geographicTaxonomies.firstTimeInsertGeographicTaxonomiesModal.add'
        )}
        onConfirm={() => handleAddNewTaxonomies()}
        onConfirmEnabled={isAddNewAutocompleteEnabled}
        showCloseButton={false}
        handleClose={() => {}}
      />
      <SessionModal
        open={openModalAddNewGeographicTaxonomies}
        title={t('overview.partyDetail.geographicTaxonomies.addNewGeographicTaxonomiesModal.title')}
        message={
          <GeoTaxonomySection
            geographicTaxonomies={partyUpdated?.geographicTaxonomies}
            notFoundAnyTaxonomies={openModalFirstTimeAddGeographicTaxonomies}
            setOptionsSelected={setOptionsSelected}
            optionsSelected={optionsSelected}
            setIsAddNewAutocompleteEnabled={setIsAddNewAutocompleteEnabled}
            isAddNewAutocompleteEnabled={isAddNewAutocompleteEnabled}
          />
        }
        onConfirmLabel={t(
          'overview.partyDetail.geographicTaxonomies.addNewGeographicTaxonomiesModal.modify'
        )}
        onCloseLabel={t(
          'overview.partyDetail.geographicTaxonomies.addNewGeographicTaxonomiesModal.back'
        )}
        onConfirm={() => handleAddNewTaxonomies()}
        onConfirmEnabled={isAddNewAutocompleteEnabled}
        handleClose={() => {
          setOpenModalAddNewGeographicTaxonomies(false);
        }}
      />
    </>
  );
}
