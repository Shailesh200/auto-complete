import { ChangeEvent } from "react";

export interface IProductInterface {
    id: number;
    name: string;
    username: string;
    email: string;
    title: string
}

export interface IInputProps {
    searchtext: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
}

export type StateType = { [key: string]: any };
export type UpdateType = StateType | ((state: StateType) => StateType);