import { useEffect } from 'react';
import useLoading from '../hooks/useLoading';
import { useLogin } from '../hooks/useLogin';
import { useAppSelector } from '../redux/hooks';
import { userSelectors } from '../redux/slices/userSlice';
import { LOADING_TASK_LOGIN_CHECK } from '../utils/constants';

// eslint-disable-next-line @typescript-eslint/ban-types
type LoginProps = {};

export default function withLogin<T extends LoginProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithLogin = (props: Omit<T, keyof LoginProps>) => {
    const user = useAppSelector(userSelectors.selectLoggedUser);
    const { attemptSilentLogin } = useLogin();
    const setLoading = useLoading(LOADING_TASK_LOGIN_CHECK);

    useEffect(() => {
      async function asyncAttemptSilentLogin() {
        await attemptSilentLogin();
      }

      if (!user) {
        setLoading(true);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        asyncAttemptSilentLogin().finally(() => setLoading(false));
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return user ? <WrappedComponent {...(props as T)} /> : <></>;
  };

  // eslint-disable-next-line functional/immutable-data
  ComponentWithLogin.displayName = `withLogin(${displayName})`;

  return ComponentWithLogin;
}
