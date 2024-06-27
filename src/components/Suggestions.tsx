import { highlightMatch } from '../utils/LayoutUtils';
import { IProductInterface, ISuggestionProps } from '../constants/interfaces';

const Suggestions = (props: ISuggestionProps) => {
    const { suggestions, inputValue, setState, productSelected } = props;
    return (
        <div className='suggestion-data'>
            {suggestions.length > 0 && !productSelected && (
                <div className="suggestion-list-wrapper">
                    {suggestions.map((user: IProductInterface) => (
                        <div
                            key={user.id}
                            className="suggesstion-list-item"
                            onClick={() => setState({
                                searchtext: user.title,
                                suggestions: [],
                                loading: false,
                                productSelected: true,
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
