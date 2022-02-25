import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect } from 'react';
import { Box, Button, FormControl, Select, Grid, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/system';
import { isEqual } from 'lodash';
import { ProductRole, productRolesGroupBySelcRole } from '../../../../model/ProductRole';
import { UserRole } from '../../../../model/Party';
import { UsersTableFiltersConfig } from './UsersTableFilters';

const CustomSelect = styled(Select)({
  '.MuiInput-root': {
    cursor: 'default',
  },
  '.MuiSelect-select.MuiSelect-standard.MuiInput-input.MuiInputBase-input': {
    cursor: 'default',
  },
});
const MenuProps = {
  PaperProps: {
    style: {
      marginLeft: '12px',
      width: '300px',
    },
  },
};
type Props = {
  productRolesList: Array<ProductRole>;
  productRolesSelected: Array<ProductRole>;
  filterSelcRole: Array<UserRole>;
  filters: UsersTableFiltersConfig;
  onFiltersChange: (f: UsersTableFiltersConfig) => void;
  disableFilters: boolean;
};

type ProductRolesGroupByTitle = { [title: string]: Array<ProductRole> };

const productRolesGroupByTitle = (roles: Array<ProductRole>): ProductRolesGroupByTitle =>
  roles.reduce((acc, r) => {
    // eslint-disable-next-line functional/immutable-data
    acc[r.title] = (acc[r.title] ?? []).concat([r]);
    return acc;
  }, {} as ProductRolesGroupByTitle);

const emptySelcRoleGroup = { ADMIN: {}, LIMITED: {} };
const labels = {
  ADMIN: {
    title: 'Amministratore',
    description: 'tutti i ruoli abilitati alla gestione dei prodotti e di Self Care',
  },
  LIMITED: {
    title: 'Operatore',
    description: 'tutti i ruoli ruoli autorizzati a operare sui prodotti',
  },
};
export default function UsersTableRolesFilter({
  productRolesSelected,
  productRolesList,
  onFiltersChange,
  filters,
  disableFilters,
}: Props) {
  const productList = (
    productRoles: Array<ProductRole>
  ): {
    [selcRole in UserRole]: ProductRolesGroupByTitle;
  } =>
    Object.fromEntries(
      Object.entries(productRolesGroupBySelcRole(productRoles)).map(([selcRole, roles]) => [
        selcRole,
        productRolesGroupByTitle(roles),
      ])
    ) as {
      [selcRole in UserRole]: ProductRolesGroupByTitle;
    };
  const selcRoleGroup = productList(productRolesList);
  const productFiltered = productList(productRolesSelected);
  const selcGroups = Object.keys(selcRoleGroup) as Array<UserRole>;

  const [open, setOpen] = React.useState(false);
  const [productRoleCheckedBySelcRole, setProductRoleCheckedBySelcRole] = React.useState<{
    [selcRole in UserRole]: ProductRolesGroupByTitle;
  }>(emptySelcRoleGroup);

  const nextProductRolesFilter = Object.values(productRoleCheckedBySelcRole)
    .flatMap((groupByTitle) => Object.values(groupByTitle))
    .flatMap((x) => x);

  useEffect(() => {
    if (productRolesSelected) {
      setProductRoleCheckedBySelcRole(productFiltered);
    } else {
      setProductRoleCheckedBySelcRole(emptySelcRoleGroup);
    }
  }, [productRolesSelected]);

  const children = (
    selcRole: UserRole,
    selcGroup: ProductRolesGroupByTitle,
    selcGroupSelected: ProductRolesGroupByTitle
  ) => (
    <Box key={`${selcRole}-children`} sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
      {Object.entries(selcGroup).map(([title, roles]) => {
        const isSelected = !!selcGroupSelected[title];
        return (
          <FormControlLabel
            key={title}
            label={
              <Typography
                variant="body2"
                sx={{ color: 'black', fontSize: '14px' }}
              >{`${title}`}</Typography>
            }
            control={
              <Checkbox
                sx={{
                  color: '#5C6F82',
                  '&.Mui-checked': {
                    color: '#0073E6',
                  },
                }}
                checked={isSelected}
                onChange={() => {
                  const nextSelcGroupSelected = isSelected
                    ? Object.fromEntries(
                        Object.entries(selcGroupSelected).filter(([t, _rs]) => t !== title)
                      )
                    : { ...selcGroupSelected, [title]: roles };
                  setProductRoleCheckedBySelcRole({
                    ...productRoleCheckedBySelcRole,
                    [selcRole]: nextSelcGroupSelected,
                  });
                }}
              />
            }
          />
        );
      })}
    </Box>
  );

  const isSelcGroupTotallySelected = (selcRole: UserRole) => {
    const selcGroupSelected = productRoleCheckedBySelcRole[selcRole];
    const selcGroup = selcRoleGroup[selcRole];
    return Object.keys(selcGroupSelected).length === Object.keys(selcGroup).length;
  };

  const selcGroupTotallySelected: { [userRole in UserRole]: boolean } = Object.fromEntries(
    (Object.keys(selcRoleGroup) as Array<UserRole>).map((s: UserRole) => [
      s,
      isSelcGroupTotallySelected(s),
    ])
  ) as { [userRole in UserRole]: boolean };

  return (
    <Box>
      <FormControl sx={{ width: 300 }} variant="standard">
        <CustomSelect
          multiple
          MenuProps={MenuProps}
          variant="standard"
          displayEmpty
          native={false}
          onClose={() => {
            setOpen(false);
            setProductRoleCheckedBySelcRole(productFiltered);
          }}
          open={open}
          IconComponent={() =>
            open ? (
              <KeyboardArrowDownIcon
                id="keyboardArrowDownIcon"
                color="primary"
                sx={{ transform: 'rotate(-180deg)', cursor: 'pointer' }}
              />
            ) : (
              <KeyboardArrowDownIcon
                id="keyboardArrowDownIcon"
                color="primary"
                sx={{ transform: 'rotate(0deg)', cursor: 'pointer' }}
                onClick={() => {
                  if (disableFilters) {
                    setOpen(false);
                  } else {
                    setOpen(true);
                  }
                }}
              />
            )
          }
          inputProps={{ onClick: () => setOpen(!open) }}
          value={selcGroups.flatMap((s) =>
            selcGroupTotallySelected[s]
              ? [labels[s].title]
              : Object.keys(productRoleCheckedBySelcRole[s])
          )}
          renderValue={(selected: any) => {
            if (selected.length === 0) {
              return <Box sx={{ fontStyle: 'normal', cursor: 'default' }}>Tutti i ruoli</Box>;
            }
            return selected.join(', ');
          }}
          sx={{
            '.MuiInput-input:focus': { backgroundColor: 'transparent' },
          }}
        >
          <Box px={3}>
            {selcGroups.map((selcRole) => {
              const selcGroupSelected = productRoleCheckedBySelcRole[selcRole];
              const selcGroup = selcRoleGroup[selcRole];
              const isSelected = selcGroupTotallySelected[selcRole];

              return [
                <FormControlLabel
                  sx={{ pb: '30px', height: '70px', mt: '7px' }}
                  key={selcRole}
                  label={
                    <Grid container sx={{ height: '100%', marginTop: '35px' }}>
                      <Grid item>
                        <Typography
                          pb={1}
                          variant="body2"
                          sx={{ color: 'black', fontStyle: 'italic' }}
                        >{`${labels[selcRole].title}`}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          sx={{ color: '#475A6D', fontSize: '12px' }}
                        >{`${labels[selcRole].description}`}</Typography>
                      </Grid>
                    </Grid>
                  }
                  control={
                    <Checkbox
                      checked={isSelected}
                      indeterminate={!isSelected && Object.keys(selcGroupSelected).length > 0}
                      onChange={() => {
                        const nextSelcGroupSelected = isSelected ? {} : { ...selcGroup };
                        setProductRoleCheckedBySelcRole({
                          ...productRoleCheckedBySelcRole,
                          [selcRole]: nextSelcGroupSelected,
                        });
                      }}
                    />
                  }
                />,
                children(selcRole, selcGroup, selcGroupSelected),
              ];
            })}
            <Grid container spacing={1} display="flex" justifyContent="center" py={3}>
              <Grid item xs={12}>
                <Button
                  disabled={isEqual(productRolesSelected, nextProductRolesFilter)}
                  sx={{ width: '100%', height: '32px' }}
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    setOpen(false);
                    onFiltersChange({
                      ...filters,
                      selcRole: [],
                      productRoles: nextProductRolesFilter,
                    });
                  }}
                >
                  Filtra
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={nextProductRolesFilter.length === 0}
                  sx={{ width: '100%', height: '32px' }}
                  color="primary"
                  variant="outlined"
                  type="submit"
                  onClick={() => {
                    setOpen(false);
                    onFiltersChange({ ...filters, selcRole: [], productRoles: [] });
                  }}
                >
                  Cancella filtri
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CustomSelect>
      </FormControl>
    </Box>
  );
}