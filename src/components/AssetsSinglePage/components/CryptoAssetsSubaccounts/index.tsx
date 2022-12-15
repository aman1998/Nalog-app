import { FC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSingleAssetDataSelector } from "store/assets/selectors";

import CryptoAssetsSubaccount from "../CryptoAssetsSubaccount";

const CryptoAssetsSubaccounts: FC = () => {
  const { id } = useParams<{ id: string }>();
  const data = useSelector(getSingleAssetDataSelector(id));

  return (
    <div className="crypto-assets-subaccounts">
      {data?.subaccounts && data?.subaccounts.map((subaccount, index) => (
        <CryptoAssetsSubaccount key={index} subaccount={subaccount} currency={data?.currency}/>
      ))}
    </div>
  );
};

export default CryptoAssetsSubaccounts;