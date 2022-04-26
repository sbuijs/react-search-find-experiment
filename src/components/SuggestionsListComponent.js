import { NoSearchResults } from "./NoSearchResults";

export const SuggestionsListComponent = ({
  filteredSuggestions,
  activeSuggestionIndex,
  onClick,
  searchInput
}) => {

  const onClickHandler = (e) => {
    const cityName = e.target.getAttribute('value')
    onClick(e, cityName)
  }

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
            value={suggestion}
            key={suggestion}
            onClick={(e) => onClickHandler(e)}
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