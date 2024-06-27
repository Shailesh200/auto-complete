import { useReducer, Reducer } from "react";
import { StateType, UpdateType } from "../constants/interfaces";


const useLegacyState = <S extends StateType>(initialState: S) =>
    useReducer<Reducer<S, UpdateType>>((state: S, update: UpdateType) =>
        typeof update === 'function' ? { ...state, ...update(state) } : { ...state, ...update }, initialState);

export { useLegacyState };