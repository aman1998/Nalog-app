import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { QUERIES } from "config/constants";

import CreateTransactionExportPage from 'components/CreateTransactionExportPage';

import useQuery from "hooks/useQuery";

import { createUploadOperationsSelector } from "store/reports/selectors";
import { createTransitionExportInit } from "store/reports/reducers";

const DocumentsCreateTransactionExportPage: FC = () => {
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

  return <CreateTransactionExportPage/>;
};

export default DocumentsCreateTransactionExportPage;
