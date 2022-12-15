export enum EAssetsSingleMenuStatesKeys {
  delete = 'delete',
  rename = 'rename',
  connect = 'connect',
  dropdown = 'dropdown'
}

export type TAssetsSingleMenuState = Record<EAssetsSingleMenuStatesKeys, boolean>