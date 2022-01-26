import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'

export const Advisor = ({ advisor }) => {

    return (
        <tr>
            <td>{advisor.Bedrijfsnaam}</td>
            <td>
                {advisor.Adres.Straatnaam}<br />
                {advisor.Adres.Postcode} <br />
                {advisor.Adres.Woonplaats}<br />
            </td>
            <td>
                <a href={advisor.Website.Url}>
                    <FontAwesomeIcon
                        className="icon"
                        icon={faExternalLinkSquareAlt}
                    />
                    {advisor.Website.Naam}
                </a>
            </td>
        </tr>
    )
}

