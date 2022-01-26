//components
import { Advisor } from "./Advisor";

const tableTitles = ["Bedrijfsnaam", "Adres", "Website"]

export const Advisors = ({ currentAdvisors }) => {

    return (
        <section id="advisors">
            <table className='table table-light'>
                <thead>
                    <tr>
                        {tableTitles.map(function (columnTitle) {
                            return (
                                <th scope="col" key={columnTitle}>
                                    {columnTitle}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {currentAdvisors.map(function (currentAdvisor) {
                        return (
                            <Advisor
                                scope="row"
                                key={currentAdvisor.id}
                                advisor={currentAdvisor}
                            />
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}