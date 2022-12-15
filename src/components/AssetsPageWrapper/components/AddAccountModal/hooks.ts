import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router";

import { EAssetsTypes } from "config/types";

import useQuery from "hooks/useQuery";

type TUseAddAccountType = () => {
  type: EAssetsTypes|null;
  setType: (val: EAssetsTypes|null) => void;
  onClose: () => void;
}
const ASSETS_TYPE = "assets-type";

export const useAddAccountType: TUseAddAccountType = () => {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const assetsType = query.get(ASSETS_TYPE) as (EAssetsTypes|null);

  const [addAccountType, setAddAccountType] = useState<EAssetsTypes|null>(assetsType || null);

  const setType = (val: EAssetsTypes|null) => {
    setAddAccountType(val);
    const queryParams = new URLSearchParams(location.search);
    if (val) {
      queryParams.set(ASSETS_TYPE, val);
    } else {
      if (queryParams.has(ASSETS_TYPE)) {
        queryParams.delete(ASSETS_TYPE);
      }
    }

    history.replace({
      search: queryParams.toString(),
    });
  };

  const onClose = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete(ASSETS_TYPE);
    history.replace({
      search: queryParams.toString(),
    });
  };

  return { type: addAccountType, setType, onClose };
};