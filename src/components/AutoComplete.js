import { useState, useMemo } from 'react';
import { SuggestionsListComponent } from './SuggestionsListComponent'

export const AutoComplete = ({ suggestions, onSearchTerm }) => {

    //input field value
    const [searchInput, setSearchInput] = useState("");

    //show/hide the suggestions
    const [showSuggestions, setShowSuggestions] = useState(false);

    //index of selected suggestion in suggestions list
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

    const filteredSuggestions = useMemo(() => {
        return suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().includes(searchInput.toLowerCase())
        );
    }, [suggestions, searchInput]);

    //when the user changes the input value this method will fire
    const handleInput = (e) => {
        e.preventDefault()

        //what the user types in the searchbar
        const userInput = e.target.value;
        //search input field gets filled with what the user types in field
        setSearchInput(userInput);

        //set the search term with the user input
        // console.log(`handleInput userInput: ${userInput}`);

        onSearchTerm(userInput);

        // setFilteredSuggestions(currentSuggestions)
        setActiveSuggestionIndex(0)
        setShowSuggestions(true)
    }


    //event that will be emitted when a user clicks on a suggestion
    const setSuggestion = (suggestion) => {
        //add the suggestion to the searchInput field
        setSearchInput(suggestion)

        //pass suggestion to the searchTerm
        onSearchTerm(suggestion);
        // console.log(suggestion);

        //empty filtered suggestions 
        // setFilteredSuggestions([]);
        //reset the active suggestion index to 0
        setActiveSuggestionIndex(0)
        //hide the suggestions list
        setShowSuggestions(false)
    }


    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            //on enter
            //get the value of the selected suggestion
            const suggestion = filteredSuggestions[activeSuggestionIndex]
            //push it to the setSuggestion()
            setSuggestion(suggestion)


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

    return (
        <>
            <input
                type="text"
                className="form-control"
                autoComplete="off"
                id="search-field"
                onKeyDown={onKeyDown}
                value={searchInput}
                onChange={(e) => handleInput(e)}
                placeholder='Vul hier de plaatsnaam in'
            />
            {showSuggestions && searchInput &&
                <SuggestionsListComponent
                    filteredSuggestions={filteredSuggestions}
                    activeSuggestionIndex={activeSuggestionIndex}
                    onClick={s => setSuggestion(s)}
                    searchInput={searchInput}
                />}
        </>
    );
}