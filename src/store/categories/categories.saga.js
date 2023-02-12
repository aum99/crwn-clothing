import { all, call, takeLatest, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utlis/firebase/firebase.utlis";
import { CATEGORIES_ACTION_TYPE } from "./categories.types";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
