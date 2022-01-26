import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export const Pagination = ({
    advisorsPerPage,
    totalAdvisors,
    currentPageNumber,
    currentPage,
    maxAmountPaginationPages }) => {
    const pageNumbers = [];


    //get the amount of page numbers
    for (let i = 1; i <= Math.ceil(totalAdvisors / advisorsPerPage); i++) {
        pageNumbers.push(i)

    }
    const paginate = (e, number) => {
        e.preventDefault()
        currentPageNumber(number)
    }

    const nextPage = () => {
        currentPageNumber(currentPage + 1)
    }

    const prevPage = () => {
        currentPageNumber(currentPage - 1)
    }

    const firstPage = () => {
        return pageNumbers[pageNumbers.length - pageNumbers.length]
    }

    const lastPage = () => {
        return pageNumbers[pageNumbers.length - 1]
    }


    //based on maxAmountPaginationPages generates array with pageItem numbers 
    //array will be used for maping and generating the pageitem buttons
    const pageItems = () => {
        //max amount of numbers on the left side
        let maxNumberLeft =
            (currentPage - Math.floor(maxAmountPaginationPages / 2))
        let maxNumberRight =
            (currentPage + Math.floor(maxAmountPaginationPages / 2))
        let amountOfPages = lastPage()

        //whan max left is smaller than 1
        if (maxNumberLeft < 1) {
            maxNumberLeft = 1
            //keep the last number on the amount of the paginanation pages
            maxNumberRight = maxAmountPaginationPages
        }

        if (maxNumberRight > amountOfPages) {
            maxNumberLeft = amountOfPages - (maxAmountPaginationPages - 1)

            if (maxNumberLeft < 1) {
                maxNumberLeft = 1
            }
            maxNumberRight = amountOfPages
        }

        //array that contains the pagenumbers that need to be visible
        const visiblePageNumbers = [];
        for (var i = maxNumberLeft; i <= maxNumberRight; i++) {
            visiblePageNumbers.push(i);
        }
        return visiblePageNumbers
    }


    return (
        <>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">

                    <li className={`page-item page-item--first 
                            ${((currentPage === firstPage()) ?
                            'disabled opacity-0' : '')}`}>
                        <a
                            className="page-link"
                            href="#next"
                            onClick={(e) => paginate(e, firstPage)}>
                            Eerste
                        </a>
                    </li>

                    <li className={`page-item page-item--prev 
                            ${(currentPage === 1) ?
                            'disabled opacity-0' : ''}`}>
                        <a
                            className="page-link"
                            href="#prev"
                            onClick={() => prevPage()}>
                            <FontAwesomeIcon
                                className="icon"
                                icon={faArrowLeft}
                            />
                        </a>
                    </li>

                    <li className={`page-item page-item disabled 
                            ${(pageItems()[0] === 1) ?
                            'opacity-0' : ''}`}>
                        <div
                            className="page-link page-link--dots"
                            href="#next">
                            ...
                        </div>
                    </li>

                    <div className='page-item-group d-flex'>
                        {pageItems().map((number, i) => {
                            i++;
                            return (
                                <li
                                    key={number}
                                    className={`page-item 
                                        ${currentPage === number ?
                                            " active" : ""}`}>
                                    <a
                                        href={`#${i}`}
                                        className={`page-link `}
                                        onClick={(e) =>
                                            paginate(e, number)}>{number}
                                    </a>
                                </li>
                            )
                        })}
                    </div>

                    <li className={`page-item disabled 
                            ${(pageItems()[maxAmountPaginationPages - 1]
                            === lastPage()) ? 'opacity-0' : ''}`}>
                        <div className="page-link page-link--dots" href="#next" >
                            ...
                        </div>
                    </li>

                    <li className={`page-item page-item--next 
                            ${(currentPage
                            === (pageNumbers[pageNumbers.length - 1]) ?
                            'disabled opacity-0' : '')}`}>
                        <a
                            className="page-link"
                            href="#next"
                            onClick={() => nextPage()}
                        >
                            <FontAwesomeIcon
                                className="icon"
                                icon={faArrowRight}
                            />
                        </a>
                    </li>

                    <li className={`page-item page-item--last 
                        ${((currentPage === lastPage()) ?
                            'disabled opacity-0' : '')}`}>
                        <a
                            className="page-link"
                            href="#next"
                            onClick={(e) => paginate(e, lastPage)} >
                            Laatste
                        </a>
                    </li>

                </ul>
            </nav>
        </>
    )
}