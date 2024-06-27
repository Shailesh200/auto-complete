import { IInputProps } from "../constants/interfaces";

const Input = (props: IInputProps) => {
    const { searchtext, handleInputChange, loading } = props;
    return (
        <div className="input-container">
            <input
                className="input-field"
                type="text"
                placeholder={'Search something here... (Eg., Classic)'}
                value={searchtext}
                onChange={handleInputChange}
            />
            {loading && <div className="loading" />}
        </div>
    );
};

export default Input;
