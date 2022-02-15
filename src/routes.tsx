import { Redirect, useParams } from 'react-router';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import withSelectedPartyProduct from './decorators/withSelectedPartyProduct';
import Dashboard from './pages/dashboard/Dashboard';
import DashboardOverview from './pages/dashboardOverview/DashboardOverview';
import DashboardUsers from './pages/dashboardUsers/DashboardUsers';
import PartySelectionContainer from './pages/partySelectionContainer/PartySelectionContainer';
import { ENV } from './utils/env';
import AddUsersProductPage from './pages/dashboardUserEdit/AddUsersProductPage';
import AddUsersPage from './pages/dashboardUserEdit/AddUsersPage';
import EditUserRegistryPage from './pages/dashboardUserEdit/EditUserRegistryPage';

export const BASE_ROUTE = ENV.PUBLIC_URL;

export type RoutesObject = { [key: string]: RouteConfig };

export type RouteConfig = {
  path: string;
  exact?: boolean;
  subRoutes?: RoutesObject;
  component?: React.ComponentType<any>;
};

const buildRedirectToBasePath = (basePath: string): RoutesObject => ({
  SUBPATH_DEFAULT: {
    path: `${basePath}/*`,
    component: (): React.FunctionComponentElement<any> => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const pathVariables: { [key: string]: string } = useParams();
      const effectiveBasePath = resolvePathVariables(basePath, pathVariables);
      return <Redirect to={`${effectiveBasePath || basePath}`} />;
    },
  },
});

const ROUTES = {
  PARTY_SELECTION: {
    path: `${BASE_ROUTE}`,
    exact: true,
    component: PartySelectionContainer,
  },
  PARTY_DASHBOARD: {
    path: `${BASE_ROUTE}/:institutionId`,
    exact: false,
    component: Dashboard,
  },
};

export const DASHBOARD_ROUTES = {
  OVERVIEW: {
    path: `${BASE_ROUTE}/:institutionId`,
    exact: true,
    component: DashboardOverview,
  },
  PARTY_USERS: {
    path: `${BASE_ROUTE}/:institutionId/roles`,
    exact: false,
    subRoutes: {
      MAIN: {
        path: `${BASE_ROUTE}/:institutionId/roles`,
        exact: true,
        component: DashboardUsers,
      },
      EDIT_USER: {
        path: `${BASE_ROUTE}/:institutionId/roles/:userId/edit`,
        exact: true,
        component: EditUserRegistryPage,
      },
      ADD_PRODUCT_USER: {
        path: `${BASE_ROUTE}/:institutionId/roles/add`,
        exact: true,
        component: AddUsersPage,
      },
      ...buildRedirectToBasePath(`${BASE_ROUTE}/:institutionId/roles`),
    },
  },
  PARTY_PRODUCT_USERS: {
    path: `${BASE_ROUTE}/:institutionId/:productId/roles`,
    exact: false,
    subRoutes: {
      MAIN: {
        path: `${BASE_ROUTE}/:institutionId/:productId/roles`,
        exact: true,
        component: withSelectedPartyProduct(DashboardUsers),
      },
      ADD_PARTY_PRODUCT_USER: {
        path: `${BASE_ROUTE}/:institutionId/:productId/roles/add`,
        exact: true,
        component: withSelectedPartyProduct(AddUsersProductPage),
      },
      ...buildRedirectToBasePath(`${BASE_ROUTE}/:institutionId/:productId/roles`),
    },
  },
  ...buildRedirectToBasePath(`${BASE_ROUTE}/:institutionId`),
};

export default ROUTES as { [key in keyof typeof ROUTES]: RouteConfig };
