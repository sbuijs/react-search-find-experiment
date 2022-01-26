export const Title = ({ searchQuery, title, ...props }) => {
    return (
        <h2>{title}{searchQuery}:</h2>
    )
}

Title.defaultProps = {
    title: 'Dit is een default titel '
}





