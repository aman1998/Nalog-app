
import { useSelector } from "react-redux";

import MainSettings from "components/MainSettings";

import { getUserInfoDataSelector } from "store/user/selectors";

const Index = (): JSX.Element => {
  const data = useSelector(getUserInfoDataSelector);
  if (data) {
    return <MainSettings data={data}/>;
  }
  return <></>;
};

export default Index;
