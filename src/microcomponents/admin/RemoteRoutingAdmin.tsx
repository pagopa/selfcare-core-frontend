import React from 'react';
import { LoadingOverlayComponent } from '@pagopa/selfcare-common-frontend';
import { CONFIG } from '@pagopa/selfcare-common-frontend/config/env';
import { DashboardAdminMicrofrontendProps } from '../dashboardMicrocomponentsUtils';

const RemoteRoutingAdmin = React.lazy(() => import('selfcareAdmin/RoutingAdmin'));

export default ({ history, store, theme, i18n, decorators }: DashboardAdminMicrofrontendProps) => (
  <React.Suspense fallback={<LoadingOverlayComponent open={true} />}>
    <RemoteRoutingAdmin
      history={history}
      store={store}
      theme={theme}
      i18n={i18n}
      decorators={decorators}
      CONFIG={CONFIG}
    />
  </React.Suspense>
);
