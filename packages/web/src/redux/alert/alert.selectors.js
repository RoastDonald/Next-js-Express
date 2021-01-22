import { createSelector } from "reselect";

const selectAlert = (state) => state.alert;

export const selectAlertDomain = createSelector(
  [selectAlert],
  (alert) => alert
);
