import { useState, useEffect, useMemo } from 'react';
import { fetchAdvisors } from './data/userRepository';
import { fetchAliases } from './data/userRepository';
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
  const [aliases, setAliases] = useState([]);


  //get data from csv file and add it to the advisorArray
  useEffect(() => {
    // only works when the file is in the public folder
    fetchAdvisors().then(values => setAdvisors(values))
    fetchAliases().then(values => setAliases(values))
    setAdvisors(advisorsCorrectedCityName)
  }, []);


  //checks if the city name corresponds with an alias 
  // changes the alias to the original naming of the city
  const advisorsCorrectedCityName = useMemo(() => {
    let advisorsCorrectCityName = [];
    advisors.forEach(advisor => {
      aliases.forEach(alias => {
        //if the city is the same as the alias
        if (advisor.Adres.Woonplaats === alias.alias) {
          //replace the city name with the original of the alias
          advisor.Adres.Woonplaats = alias.original
        }
      });
      //add the advisor to the array
      advisorsCorrectCityName.push(advisor)
    });
    return advisorsCorrectCityName
  }, [advisors, aliases]);


  const filteredAdvisors = useMemo(() => {
    const newArr = [];
    advisors.forEach(advisor => {
      if (
        advisor.Adres.Woonplaats.toLowerCase()
          .includes(searchQuery.toLowerCase())) {
        newArr.push(advisor)
      }
    });
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
  }, [advisorsCorrectedCityName]);



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