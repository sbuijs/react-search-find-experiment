//components
import { Advisors } from '../components/Advisors';
import { Pagination } from '../components/Pagination';
import { Title } from '../components/Title';

export const SearchResults =
    ({ searchQuery,
        currentAdvisors,
        advisorsArray,
        currentPage,
        advisorsPerPage,
        fitleredAdvisors,
        currentPageNumber,
        resultsVisible,
        maxAmountPaginationPages }) => {

        return (
            <>
                <div
                    id="search-results"
                    className={resultsVisible ? '' : 'hidden'}>
                    <Pagination
                        currentPage={currentPage}
                        advisorsPerPage={advisorsPerPage}
                        totalAdvisors={fitleredAdvisors}
                        currentPageNumber={n => currentPageNumber(n)}
                        maxAmountPaginationPages={maxAmountPaginationPages} />
                    <Title
                        title="Adviseurs in "
                        searchQuery={searchQuery} />
                    <Advisors
                        searchQuery={searchQuery}
                        currentAdvisors={currentAdvisors}
                        advisorsArray={advisorsArray}
                        currentPage={currentPage}
                        advisorsPerPage={advisorsPerPage} />
                </div>
            </>
        )
    }