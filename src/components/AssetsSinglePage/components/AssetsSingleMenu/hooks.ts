import { useState } from "react";

import { EAssetsSingleMenuStatesKeys, TAssetsSingleMenuState } from "./types";

type TUseAssetsSingleMenuState = () => [
  TAssetsSingleMenuState,
  (key: EAssetsSingleMenuStatesKeys) => void,
  (key: EAssetsSingleMenuStatesKeys) => void,
  (key: EAssetsSingleMenuStatesKeys) => void
]

export const useAssetsSingleMenuState: TUseAssetsSingleMenuState = () => {
  const [visible, setVisible] = useState<TAssetsSingleMenuState>({
    [EAssetsSingleMenuStatesKeys.delete]: false,
    [EAssetsSingleMenuStatesKeys.rename]: false,
    [EAssetsSingleMenuStatesKeys.connect]: false,
    [EAssetsSingleMenuStatesKeys.dropdown]: false,
  });

  const setVisibleFalse = (key: EAssetsSingleMenuStatesKeys) =>
    setVisible(prev => ({ ...prev, [key]: false }));

  const setVisibleTrue = (key: EAssetsSingleMenuStatesKeys) =>
    setVisible(prev => ({ ...prev, [key]: true }));

  const setVisibleToggle = (key: EAssetsSingleMenuStatesKeys) =>
    setVisible(prev => ({ ...prev, [key]: !prev[key] }));

  return [visible, setVisibleToggle, setVisibleFalse, setVisibleTrue];
};