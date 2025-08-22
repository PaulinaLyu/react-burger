import { createWsSlice } from "./reducers/wsSliceFactory";
import { IOrdersFeed } from "../models";

export const feedWs = createWsSlice<IOrdersFeed>("feedWs");
export const profileWs = createWsSlice<IOrdersFeed>("profileWs");

export const feedWsActions = feedWs.actions;
export const profileWsActions = profileWs.actions;
