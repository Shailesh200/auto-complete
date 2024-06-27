import { IProductInterface } from '../constants/interfaces';
import { highlightMatch } from '../utils/LayoutUtils';

interface ISuggestionProps {
    suggestions: IProductInterface[];
    setState: any;
    inputValue: string;
}

const Suggestions = (props: ISuggestionProps) => {
    const { suggestions, inputValue, setState } = props;
    return (
        <div className='suggestion-data'>
            {suggestions.length > 0 && (
                <div className="suggestion-list-wrapper">
                    {suggestions.map((user: IProductInterface) => (
                        <div
                            key={user.id}
                            className="suggesstion-list-item"
                            onClick={() => setState({
                                searchtext: user.title,
                                suggestions: [],
                                loading: false
                            })}
                            dangerouslySetInnerHTML={{
                                __html: highlightMatch(user.title, inputValue),
                            }}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Suggestions;
