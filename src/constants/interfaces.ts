import { ChangeEvent } from "react";

export interface IProductInterface {
    id: number;
    name: string;
    username: string;
    email: string;
    title: string
}

export interface ISuggestionProps {
    suggestions: IProductInterface[];
    setState: any;
    inputValue: string;
    productSelected: boolean;
}


export interface IInputProps {
    searchtext: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    productSelected: boolean;
}

export type StateType = { [key: string]: any };
export type UpdateType = StateType | ((state: StateType) => StateType);