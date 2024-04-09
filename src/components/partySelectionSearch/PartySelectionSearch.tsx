import React, { useEffect, useRef, useState } from 'react';
import { Grid, Typography, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { roleLabels } from '@pagopa/selfcare-common-frontend/utils/constants';
import { BaseParty } from '../../model/Party';
import PartySelectionSearchInput from './PartySelectionSearchInput';
import PartyItemContainer from './PartyItemContainer';
import PartyAccountItemSelection from './PartyAccountItemSelection';

type Props = {
  parties: Array<BaseParty>;
  selectedParty: BaseParty | null;
  onPartySelectionChange: (selectedParty: BaseParty | null) => void;
  label?: string;
  iconColor?: string;
  iconMarginRight?: string;
  partyTitle?: string;
};

const verifyPartyFilter = (party: BaseParty, filter: string) =>
  party.description && party.description.toUpperCase().indexOf(filter.toUpperCase()) >= 0;
const CustomBox = styled(Box)({
  '&::-webkit-scrollbar': {
    width: 4,
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: `inset 10px 10px  #E6E9F2`,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#0073E6',
    borderRadius: '16px',
  },
  overflowY: 'auto',
  height: '100%',
});

export default function PartySelectionSearch({
  parties,
  selectedParty,
  onPartySelectionChange,
  label,
  iconColor,
  iconMarginRight,
  partyTitle,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [visibleParties, setVisibleParties] = useState<Array<BaseParty>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Initially, show the first batch of parties
    setVisibleParties(parties.slice(0, 50));
  }, [parties]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollHeight - containerRef.current.scrollTop ===
          containerRef.current.clientHeight
      ) {
        // User has scrolled to the bottom, load more parties
        loadMoreParties();
      }
    };

    containerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [visibleParties]); // Re-run effect when visibleParties change

  useEffect(() => {
    console.log('containerRef.current', containerRef.current);
  }, [containerRef.current]);

  const loadMoreParties = () => {
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        const remainingParties = parties.slice(visibleParties.length); // Get remaining parties
        const nextBatch = remainingParties.slice(0, 50); // Load next batch from remaining parties
        setVisibleParties(prevParties => [...prevParties, ...nextBatch]);
        setIsLoading(false);
      }, 500);
    }
  };
  

  const onFilterChange = (value: string) => {
    setSearchQuery(value);
    if (!value) {
      setVisibleParties(parties.slice(0, 50));
    } else {
      const filteredParties = parties.filter(party =>
        verifyPartyFilter(party, value)
      );
      setVisibleParties(filteredParties.slice(0, 50));
    }
    if (value && selectedParty && !verifyPartyFilter(selectedParty, value)) {
      onPartySelectionChange(null);
    }
  };
  
  

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    party: BaseParty
  ) => {
    onPartySelectionChange(party);
  };

  const moreThan3Parties = parties.length > 3;

  return (
    <React.Fragment>
      {parties.length >= 1 && (
        <Grid container item direction="column">
          {(partyTitle || moreThan3Parties) && !selectedParty && (
            <Grid item my={2}>
              {moreThan3Parties ? (
                <PartySelectionSearchInput
                  label={label}
                  iconMarginRight={iconMarginRight}
                  onChange={(e) => onFilterChange(e.target.value)}
                  input={searchQuery}
                  clearField={() => onFilterChange('')}
                  iconColor={iconColor}
                />
              ) : (
                parties.length >= 1 && (
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: theme.typography.fontWeightBold, color: 'text.disabled' }}
                  >
                    {partyTitle}
                  </Typography>
                )
              )}
            </Grid>
          )}

          <Grid
            item
            sx={{
              overflow: 'auto',
              height: 'auto',
              maxHeight: moreThan3Parties ? '220px' : '270px',
            }}
          >
            {selectedParty && moreThan3Parties ? (
              <PartyAccountItemSelection
                selectedParty={selectedParty}
                clearField={() => onPartySelectionChange(null)}
              />
            ) : (
              <>
                {visibleParties.length === 0 ? (
                  <Typography
                    py={2}
                    sx={{
                      fontSize: '18px',
                      fontWeight: 'fontWeightBold',
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    {t('partySelection.notFoundResults')}
                  </Typography>
                ) : (
                  <CustomBox
                    ref={containerRef}
                    sx={{ pointerEvents: parties.length !== 1 ? 'auto' : 'none' }}
                  >
                    {visibleParties &&
                      visibleParties.map((party) => {
                        const isDisabled =
                          party.status === 'PENDING' || party.status === 'TOBEVALIDATED';
                        return (
                          <PartyItemContainer
                            key={party.partyId}
                            image={party.urlLogo}
                            title={party.description}
                            subTitle={t(roleLabels[party.userRole]?.longLabelKey)}
                            moreThan3Parties={moreThan3Parties}
                            isDisabled={isDisabled}
                            selectedItem={parties.length !== 1 ? selectedParty === party : false}
                            chip={
                              party.status === 'PENDING'
                                ? t('partySelection.partyStatus.pending')
                                : party.status === 'TOBEVALIDATED'
                                ? t('partySelection.partyStatus.toBeValidated')
                                : ''
                            }
                            action={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                              handleListItemClick(event, party)
                            }
                            parentPartyName={party.parentDescription}
                          />
                        );
                      })}
                  </CustomBox>
                )}
              </>
            )}
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
