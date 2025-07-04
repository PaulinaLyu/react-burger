import { useSelector } from "react-redux";
import type { RootState } from "../services/reducers";

export const useAppSelector = useSelector.withTypes<RootState>();
