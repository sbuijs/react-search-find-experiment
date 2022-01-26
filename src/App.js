import { useState, useEffect, useMemo } from 'react';
import { fetchAdvisors } from './data/userRepository';
import './App.css';

//components
import { SearchResults } from './components/SearchResults';
import { SearchComponent } from './components/SearchComponent';



function App() {

  const [advisors, setAdvisors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultsVisible, setResultsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [advisorsPerPage] = useState(10);
  const [maxAmountPaginationPages] = useState(7);

  //get data from csv file and add it to the advisorArray
  useEffect(() => {
    // only works when the file is in the public folder
    fetchAdvisors().then(values => setAdvisors(values));
  }, []);

  const filteredAdvisors = useMemo(() => {
    const newArr = [];
    advisors.forEach(advisor => {
      if (
        advisor.Bedrijfsnaam.toLowerCase()
          .includes(searchQuery.toLowerCase())
        ||
        advisor.Adres.Woonplaats.toLowerCase()
          .includes(searchQuery.toLowerCase())) {
        newArr.push(advisor)
      }
    });
    // console.log(`Dit is de searchQuery: ${searchQuery}`);
    return newArr
  }, [advisors, searchQuery]);


  //Pagination variables
  const indexOfLastAdvisor = useMemo(() => {
    return currentPage * advisorsPerPage;
  }, [currentPage, advisorsPerPage])

  const indexOfFirstAdvisor = useMemo(() => {
    return indexOfLastAdvisor - advisorsPerPage;
  }, [indexOfLastAdvisor, advisorsPerPage])

  const currentAdvisors = useMemo(() => {
    return filteredAdvisors.slice(indexOfFirstAdvisor, indexOfLastAdvisor)
  }, [filteredAdvisors, indexOfFirstAdvisor, indexOfLastAdvisor])

  //Set the current page number
  const currentPageNumber = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //filter the list of advisors to create list of suggestions
  const suggestions = useMemo(() => {
    const filterAdvisorsSuggestions = [];
    advisors.forEach(advisor => {
      filterAdvisorsSuggestions.push(advisor.Adres.Woonplaats)
    })
    //Set removes all duplicate items
    const uniqueSetAdvisorsWoonplaats = new Set(filterAdvisorsSuggestions);
    //convert uniqueSet back to an array
    const filteredSugestions = [...uniqueSetAdvisorsWoonplaats]
    //sort on alphabetical order
    filteredSugestions.sort()
    return filteredSugestions
  }, [advisors]);


  return (
    <div className="App">
      <SearchComponent
        suggestions={suggestions}
        onSearch={setSearchQuery}
        setSearchQuery={setSearchQuery}
        setResultsVisible={setResultsVisible}
      />
      <SearchResults
        resultsVisible={resultsVisible}
        searchQuery={searchQuery}
        currentAdvisors={currentAdvisors}
        advisorsArray={advisors}
        currentPage={currentPage}
        advisorsPerPage={advisorsPerPage}
        fitleredAdvisors={filteredAdvisors.length}
        currentPageNumber={n => currentPageNumber(n)}
        maxAmountPaginationPages={maxAmountPaginationPages}
      />
    </div>
  );
}

export default App;