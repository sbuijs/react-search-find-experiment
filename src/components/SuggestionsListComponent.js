import { NoSearchResults } from "./NoSearchResults";

export const SuggestionsListComponent = ({
  filteredSuggestions,
  activeSuggestionIndex,
  onClick,
  searchInput }) => {

  return filteredSuggestions.length ? (
    <ul className="suggestions">
      {filteredSuggestions.map((suggestion, index) => {
        let className;
        // add class to active suggestion
        if (index === activeSuggestionIndex) {
          className = "suggestion-active";
        }
        return (
          <li
            className={className}
            key={suggestion}
            onClick={() => onClick(suggestion)}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  ) : (
    <div className="no-suggestions">
      <NoSearchResults searchInput={searchInput} />
    </div>
  )
}