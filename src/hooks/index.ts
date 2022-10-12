import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from "./useTitle";
export * from "./useAuthRequired";
export * from "./useDebounce";
export * from "./useDebouncedCallback";
export * from "./useList";
export * from "./usePermissionFallback";
export * from "./useSubnav";
