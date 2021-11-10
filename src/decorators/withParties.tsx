import { useEffect } from 'react';
import { PartyProcessApi } from '../api/PartyProcessApiClient';
import useLoading from '../hooks/useLoading';
import { institutionInfo2Party, Party } from '../model/Party';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { partiesActions, partiesSelectors } from '../redux/slices/partiesSlice';
import { LOADING_TASK_SEARCH_PARTIES } from '../utils/constants';

export default function withParties<T>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithParties = (props: T) => {
    const dispatch = useAppDispatch();
    const parties = useAppSelector(partiesSelectors.selectPartiesList);
    const setPartiesList = (parties: Array<Party>) =>
      dispatch(partiesActions.setPartiesList(parties));
    const setLoading = useLoading(LOADING_TASK_SEARCH_PARTIES);

    useEffect(() => {
      if (!parties) {
        setLoading(true);
        PartyProcessApi.getOnBoardingInfo()
          .then((onBoardingInfo) =>
            setPartiesList(
              onBoardingInfo.institutions
                ? onBoardingInfo.institutions.map(institutionInfo2Party)
                : []
            )
          )
          .catch((reason) => {
            /* TODO  errorHandling */ console.error(reason);
          })
          .finally(() => setLoading(false));
      }
    }, []);

    return <WrappedComponent {...(props as T)} />;
  };

  // eslint-disable-next-line functional/immutable-data
  ComponentWithParties.displayName = `withParties(${displayName})`;

  return ComponentWithParties;
}
