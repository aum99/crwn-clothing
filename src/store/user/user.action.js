import { createAction } from "../../utlis/reducer/reducer.utils";
import { USER_STATE_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
  createAction(USER_STATE_TYPES.SET_CURRENT_USER, user);
