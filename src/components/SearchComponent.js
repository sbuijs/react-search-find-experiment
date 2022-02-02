import { useState } from "react";
import { AutoComplete } from './AutoComplete';

export const SearchComponent = ({
    onSearch,
    setResultsVisible,
    suggestions,
    setShowSuggestions,
    suggestion
}) => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm)
        setResultsVisible(true)
    }


    return (
        <section id="search-component">
            <form id="search-form"
                onSubmit={value => handleSubmit(value)
                }>
                <div className="mb-3 d-flex w-100">
                    <label
                        htmlFor="exampleInputEmail1search-field"
                        className="form-label"
                    >
                        <AutoComplete
                            suggestions={suggestions}
                            onSearchTerm={setSearchTerm}
                            setShowSuggestions={(e) => setShowSuggestions(e)}
                        />
                    </label>
                    <button
                        type="submit"
                        value="Submit"
                        className={`btn btn-dark 
                            ${(!searchTerm) ? 'disabled' : ''}`}>
                        Zoek adviseurs
                    </button>
                </div>
            </form>
        </section >
    )
}

