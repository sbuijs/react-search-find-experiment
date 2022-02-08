import { useState, useMemo } from 'react'
import { SuggestionsListComponent } from './SuggestionsListComponent'

export const SearchComponent = ({ setResultsVisible, onSearch, suggestions }) => {

    //input field value
    const [searchInput, setSearchInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

    const filteredSuggestions = useMemo(() => {
        return suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().includes(searchInput.toLowerCase())
        );
    }, [suggestions, searchInput]);


    //when user presses button or enter
    const handleSubmit = (e, searchValue) => {
        e.preventDefault()

        setShowSuggestions(false)
        setResultsVisible(true)
        setActiveSuggestionIndex(0)
        onSearch(searchValue)
    }

    //when user is typing in the field
    const handleInput = (e) => {
        e.preventDefault()
        const userInput = e.target.value;
        setSearchInput(userInput);
        setShowSuggestions(true)
        // console.log(`showSuggestions: ${showSuggestions}`);
    }

    //when user uses keys to navigate
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            const suggestion = filteredSuggestions[activeSuggestionIndex]
            setSearchInput(suggestion)
            handleSubmit(e, suggestion)

        } else if (e.keyCode === 38) {
            //on arrow up
            if (activeSuggestionIndex <= 0) {
                //do nothing
                return
            } if (activeSuggestionIndex > 0) {
                //increment index with one
                setActiveSuggestionIndex(activeSuggestionIndex - 1)
            }
        } else if (e.keyCode === 40) {
            //on  arrow down
            if (activeSuggestionIndex <= filteredSuggestions.length - 2) {
                //increment index with one
                setActiveSuggestionIndex(activeSuggestionIndex + 1)
            }
        }
    }

    const setSuggestion = (e, cityName) => {
        setSearchInput(cityName)
        handleSubmit(e, cityName)
    }


    return (
        <>
            <section id="search-component">
                <form id="search-form" onSubmit={(e, value) => handleSubmit(e, value)}>
                    <div className="mb-3 d-flex w-100">
                        <label
                            htmlFor="exampleInputEmail1search-field"
                            className="form-label">
                            <input
                                type="text"
                                className="form-control"
                                autoComplete="off"
                                id="search-field"
                                onKeyDown={(e) => onKeyDown(e)}
                                value={searchInput}
                                onChange={(e) => handleInput(e)}
                                placeholder='Vul hier de plaatsnaam in'
                            />
                            {showSuggestions && searchInput &&
                                <SuggestionsListComponent
                                    filteredSuggestions={filteredSuggestions}
                                    activeSuggestionIndex={activeSuggestionIndex}
                                    onClick={setSuggestion}
                                    searchInput={searchInput}
                                />}
                        </label>
                        <button
                            type="submit"
                            value="Submit"
                            className={`btn btn-dark`}>
                            Zoek adviseurs
                        </button>
                    </div>
                </form>
            </section >
        </>
    );
}






