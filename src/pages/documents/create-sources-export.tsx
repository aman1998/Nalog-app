import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import CreateSourcesExportPage from 'components/CreateSourcesExportPage';

import { QUERIES } from "../../config/constants";
import { createTransitionExportInit } from "../../store/reports/reducers";
import useQuery from "../../hooks/useQuery";
import { createUploadOperationsSelector } from "../../store/reports/selectors";

const CreateSourcesExport: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const createSourceId = query.get(QUERIES.createSourceId) as string;
  const createUploadOperations
    = useSelector(createUploadOperationsSelector(createSourceId));

  useEffect(() => {
    const $id = new Date().getTime();
    dispatch(createTransitionExportInit({ id: String($id) }));
    history.replace({
      search: `?${QUERIES.createSourceId}=${$id}`
    });
  }, []);

  if (!createUploadOperations || !createSourceId) {
    return <></>;
  }
  
  return <CreateSourcesExportPage/>;
};

export default CreateSourcesExport;