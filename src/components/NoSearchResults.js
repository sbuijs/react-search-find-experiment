
export const NoSearchResults = ({ searchInput }) => {
    return (
        <>
            <p className="error">
                We kunnen geen adviseurs vinden in '{searchInput}'
            </p>
            <p>
                Probeer een andere plaatsnaam.
            </p>
        </>
    )
}