import { put, takeLatest, all, call, select } from "redux-saga/effects";
import { AxiosError, AxiosResponse } from "axios";
import { isFunction } from "lodash";

import request from "API";

import {
  getTransactionsListRequest,
  getTransactionsListSuccess,
  getTransactionsListFailure,
  getSingleTransactionFailure,
  getSingleTransactionRequest,
  getSingleTransactionSuccess,
  editSingleTransactionFailure,
  editSingleTransactionRequest,
  editSingleTransactionSuccess,
  uploadSingleTransactionFileFailure,
  uploadSingleTransactionFileRequest,
  uploadSingleTransactionFileSuccess,
  getSingleTransactionFilesSuccess,
  getSingleTransactionFilesFailure,
  getSingleTransactionFilesRequest,
  deleteTransactionFilesSuccess,
  deleteTransactionFilesFailure,
  deleteTransactionFilesRequest,
  createManualTransactionSuccess,
  createManualTransactionFailure,
  createManualTransactionRequest,
  editManualTransactionFailure,
  editManualTransactionRequest,
  editManualTransactionSuccess,
  closeAddModal,
  closeEditConfirm,
  closeEditModal,
  uploadMultipleFiles,
  changeAddModalStep,
  deleteManualTransactionRequest,
  deleteManualTransactionSuccess,
  deleteManualTransactionFailure,
  getTransactionSuccess,
  getTransactionFailure,
  getTransactionRequest,
  editTransactionNoteRequest,
  editTransactionNoteSuccess,
  editTransactionNoteFailure,
  editTransactionTagRequest,
  editTransactionTagSuccess,
  editTransactionTagFailure,
  getTransactionsListSetTransaction,
  assetsTagsRequest,
  assetsTagsSuccess,
  assetsTagsFailure,
} from "store/transactions/reducers";
import {
  reportTransactionsDeleteItem,
  reportTransactionsSetItemValues,
} from "store/reports/reducers";

import { showSuccess } from "utils/notifications";
import { convertTransactionsFilterToList, convertUrlParams } from "utils/url";

import i18n from "../../i18n";

import { IApplicationState, IPayloadAction } from "../rootInterface";
import { defaultTransactionsFilter } from "../filter/types";
import { PAGINATION_PAGE_LIMIT } from "../constants";

import {
  IGetTransactionsListRequest,
  TTransactionsData,
  TEditSingleTransactionPayload,
  TDownloadSingleTransactionFilesPayload,
  IUploadMultipleTransactionFilesPayload,
  TCreateManualTransactionPayload,
  TEditSingleTransactionData,
  TDeleteManualTransactionPayload,
  TTransactionDeleteFilesOptions,
  TUploadSingleFileTransaction,
  TEditTransactionNotePayload,
  TEditTransactionTagPayload,
} from "./types";

function* getTransactionsList(action: IPayloadAction<IGetTransactionsListRequest>): Generator {
  const { offset = 0, limit = PAGINATION_PAGE_LIMIT, infiniteScroll, callback, ...filters } = action.payload;
  try {
    const params: URLSearchParams = convertUrlParams(convertTransactionsFilterToList(filters));
    params.append("limit", limit.toString());
    params.append("offset", offset.toString());

    const { data } = (
      yield call(request.get, "/assets/transactions/", { params }) ) as AxiosResponse<TTransactionsData>;
    yield put(getTransactionsListSuccess({ ...data, infiniteScroll, limit, offset }));
    if (isFunction(callback)) {
      if (infiniteScroll && data.next) {
        callback(data.next);
      } else {
        callback();
      }
    }
  } catch (error) {
    yield put(getTransactionsListFailure(error as AxiosError));
  }
}

function* getTransaction(action: IPayloadAction<{ id: string, callOnError?: () => void }>) {
  const { id, callOnError } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.get, `/assets/transactions/${id}/`);
    yield put(getTransactionSuccess(response.data));
    yield put(reportTransactionsSetItemValues({ id: action.payload, data:response.data }));

  } catch (error) {
    yield put(getTransactionFailure(error as AxiosError));
    if (isFunction(callOnError)) callOnError();
  }
}

function* getSingleTransaction(action: IPayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(request.get, `/assets/transactions/${action.payload}/save-details/`);
    yield put(getSingleTransactionSuccess({ id: action.payload, data: response.data }));
  } catch (error) {
    yield put(getSingleTransactionFailure({ id: action.payload, error }));
  }
}

function* getSingleTransactionFiles(action: IPayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(request.get, `/assets/transactions/${action.payload}/files/`);
    yield put(getSingleTransactionFilesSuccess({ id: action.payload, data: response.data }));
  } catch (error) {
    yield put(getSingleTransactionFilesFailure({ id: action.payload, error }));
  }
}

function* createManualTransaction(action: IPayloadAction<TCreateManualTransactionPayload>) {
  try {
    const { values, files, finalCall } = action.payload;

    const response: AxiosResponse = yield call(request.post, "/assets/transactions/manual/create/", values);
    yield put(createManualTransactionSuccess(response.data));
    yield put(closeAddModal());
    yield put(changeAddModalStep(1));

    if (isFunction(finalCall) && response.data?.transaction_id) finalCall(response.data?.transaction_id);
    yield put(getTransactionsListRequest(defaultTransactionsFilter));

    if (!!files.length && response.data?.transaction_id) {
      yield put(uploadMultipleFiles({ id: response.data.transaction_id, files }));
    }

    showSuccess(i18n.t("notification.createManualTransaction"));
  } catch (error) {
    yield put(createManualTransactionFailure(error));
  }
}

function* editSingleTransaction(action: IPayloadAction<TEditSingleTransactionPayload<TEditSingleTransactionData>>) {
  const { id, values, files, deleteFiles, closeIncomingOperationModal } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.put, `/assets/transactions/${id}/save-details/`, values);
    yield put(editSingleTransactionSuccess({ id, data: response.data }));

    if (!!deleteFiles && deleteFiles.length) {
      yield put(deleteTransactionFilesRequest({ id, files: deleteFiles }));
    }

    if (!!files && files.length) {
      yield put(uploadMultipleFiles({ id, files, closeIncomingOperationModal }));
    } else {
      if (isFunction(closeIncomingOperationModal)) closeIncomingOperationModal();
      showSuccess(i18n.t("notification.editSingleTransaction"));
    }

    yield put(closeEditConfirm());
    yield put(closeEditModal());
    yield put(getTransactionRequest({ id }));
  } catch (error) {
    yield put(editSingleTransactionFailure({ id, error }));
  }
}

function* editManualTransaction(
  action: IPayloadAction<TEditSingleTransactionPayload<TCreateManualTransactionPayload>>
) {
  const { id, values, files, deleteFiles } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.put, `/assets/transactions/manual/${id}/`, values);
    yield put(editManualTransactionSuccess({ id, data: response.data }));

    if (!!deleteFiles && deleteFiles.length) {
      yield put(deleteTransactionFilesRequest({ id, files: deleteFiles }));
    }
    if (!!files && files.length) {
      yield put(uploadMultipleFiles({ id, files }));
    }
    yield showSuccess(i18n.t("notification.editManualTransaction"));
    yield put(closeEditModal());
    yield put(getTransactionRequest({ id }));
  } catch (error) {
    yield put(editManualTransactionFailure({ id, error }));
  }
}

function* deleteManualTransaction(action: IPayloadAction<TDeleteManualTransactionPayload>) {
  try {
    yield call(request.delete, `/assets/transactions/manual/${action.payload.id}/`);
    yield put(deleteManualTransactionSuccess({ id: action.payload.id }));
    yield put(reportTransactionsDeleteItem({ id: action.payload.id }));

    if (isFunction(action.payload.callback)) yield action.payload.callback();

    yield showSuccess(i18n.t("notification.deleteManualTransaction"));
  } catch (error) {
    yield put(deleteManualTransactionFailure({ id: action.payload.id, error }));
  }
}

function* uploadSingleTransactionFile(action: IPayloadAction<TDownloadSingleTransactionFilesPayload>) {
  const { id, file, purpose } = action.payload; // onProgress
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", file.name);
  formData.append("purpose", purpose);

  try {
    const response: AxiosResponse = yield call(request.post, `/assets/transactions/${id}/files/`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
      // need do progress in future
      // onUploadProgress: (e: ProgressEvent): void => {
      //   onProgress(e, id);
      // }
    });
    yield put(uploadSingleTransactionFileSuccess({ id, data: response.data }));
    yield put(getTransactionRequest({ id }));
    // showSuccess("Вы успешно добавили файл(ы)");
  } catch (error) {
    yield put(uploadSingleTransactionFileFailure({ id, error }));
  }
}

function* uploadSingleTransactionFileSaga(data: TDownloadSingleTransactionFilesPayload) {
  const { id, file, purpose } = data; // onProgress
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", file.name);
  formData.append("purpose", purpose);

  try {
    const response: AxiosResponse = yield call(request.post, `/assets/transactions/${id}/files/`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
      // need do progress in future
      // onUploadProgress: (e: ProgressEvent): void => {
      //   onProgress(e, id);
      // }
    });
    yield put(uploadSingleTransactionFileSuccess({ id, data: response.data }));
    yield put(getTransactionRequest({ id }));
    // showSuccess("Вы успешно добавили файл(ы)");
  } catch (error) {
    yield put(uploadSingleTransactionFileFailure({ id, error }));
  }
}

function* handleErrorsAfterUploadingSingleTransactionFiles(closeIncomingOperationModal?: () => void) {
  const previousState: Record<string, TUploadSingleFileTransaction> =
    yield select((state: IApplicationState) => state.transactions.uploadSingleTransactionFilesState);
  const errorStates = Object.keys(previousState).map(key => !!previousState[key].failure);
  if (errorStates.every(v => !v)) {
    if (isFunction(closeIncomingOperationModal)) closeIncomingOperationModal();
    showSuccess(i18n.t("notification.editSingleTransaction"));
  }
}

function* uploadMultipleTransactionFiles(action: IPayloadAction<IUploadMultipleTransactionFilesPayload>): Generator {
  const { id, files, closeIncomingOperationModal } = action.payload;

  // const requests = files.map(file =>
  //   put(
  //     uploadSingleTransactionFileRequest({
  //       id,
  //       file: file.src,
  //       name: file.name,
  //       purpose: file.purpose,
  //     })
  //   )
  // );
  // yield all(requests);

  try {
    yield all(files.map(file =>
      (
        call(uploadSingleTransactionFileSaga, {
          id,
          file: file.src,
          name: file.name,
          purpose: file.purpose || "",
        })
      )
    ));
  } finally {
    yield handleErrorsAfterUploadingSingleTransactionFiles(closeIncomingOperationModal);
  }
}

function* deleteTransactionFiles(action: IPayloadAction<TTransactionDeleteFilesOptions>) {
  const { id, files } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.post, "/assets/transactions/delete-files/", {
      files,
    });
    yield put(deleteTransactionFilesSuccess(response.data));
    yield put(getTransactionRequest({ id }));
  } catch (error) {
    yield put(deleteTransactionFilesFailure(error));
  }
}

function* editTransactionNote(action: IPayloadAction<TEditTransactionNotePayload>) {
  const { data, id, callOnSuccess } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.put, `/assets/transactions/${id}/note/`, data);
    yield put(editTransactionNoteSuccess(response.data));
    yield put(getTransactionsListSetTransaction({ id, data: response.data }));
    if (isFunction(callOnSuccess)) callOnSuccess();
  } catch (error) {
    yield put(editTransactionNoteFailure(error));
  }
}

function* editTransactionTag(action: IPayloadAction<TEditTransactionTagPayload>) {
  const { data, id, callOnSuccess } = action.payload;
  try {
    const response: AxiosResponse = yield call(request.put, `/assets/transactions/${id}/tags/`, data);
    yield put(editTransactionTagSuccess(response.data));
    yield put(getTransactionsListSetTransaction({ id, data: { tags: response.data } }));
    if (isFunction(callOnSuccess)) callOnSuccess();
  } catch (error) {
    yield put(editTransactionTagFailure(error));
  }
}

function* getAssetsTags() {
  try {
    const response: AxiosResponse = yield call(request.get, "/assets/tags/");
    yield put(assetsTagsSuccess(response.data));
  } catch (error) {
    yield put(assetsTagsFailure(error));
  }
}

function* Saga(): Generator {
  yield all([
    takeLatest(getTransactionsListRequest.type, getTransactionsList),
    takeLatest(getTransactionRequest.type, getTransaction),
    takeLatest(getSingleTransactionRequest.type, getSingleTransaction),
    takeLatest(getSingleTransactionFilesRequest.type, getSingleTransactionFiles),
    takeLatest(editSingleTransactionRequest.type, editSingleTransaction),
    takeLatest(editManualTransactionRequest.type, editManualTransaction),
    takeLatest(deleteManualTransactionRequest.type, deleteManualTransaction),
    takeLatest(uploadMultipleFiles.type, uploadMultipleTransactionFiles),
    takeLatest(uploadSingleTransactionFileRequest.type, uploadSingleTransactionFile),
    takeLatest(deleteTransactionFilesRequest.type, deleteTransactionFiles),
    takeLatest(createManualTransactionRequest.type, createManualTransaction),
    takeLatest(editTransactionNoteRequest.type, editTransactionNote),
    takeLatest(editTransactionTagRequest.type, editTransactionTag),
    takeLatest(assetsTagsRequest.type, getAssetsTags),
  ]);
}

export default Saga;

