import { debounce, put, retry, takeLatest } from "redux-saga/effects";
import {
  fetchSkillsRequest,
  fetchSkillsSuccess,
  fetchSkillsFailure,
} from "./skillsSlice";
import { searchSkills } from "../api";

function* handleChangeSearchSaga(
  action: ReturnType<typeof fetchSkillsRequest>
) {
  const query = action.payload.trim();
  if (query === "") {
    yield put(fetchSkillsSuccess([]));
    return;
  }

  try {
    const data: { id: number; name: string }[] = yield retry(
      3,
      1000,
      searchSkills,
      query
    );
    yield put(fetchSkillsSuccess(data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(fetchSkillsFailure(e.message));
    } else {
      yield put(fetchSkillsFailure("Unknown error"));
    }
  }
}

export default function* rootSaga() {
  yield debounce(300, fetchSkillsRequest.type, handleChangeSearchSaga);
}
