import { useAppSelector } from '../state/hooks';
import { ConfigState, selectConfig } from '../state/config/configSlice';

export function useConfig(): ConfigState {
  return useAppSelector(selectConfig);
}
