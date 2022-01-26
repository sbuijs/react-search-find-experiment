import { v4 as uuidv4 } from 'uuid';


export const fetchAdvisors = () => {
    return fetch('/data/advisors_10000--original.csv')
        .then((response) => response.text())
        .then(csv => {

            //get advisors > split the rows into each one of the fields
            const rawAdvisors = csv.split('\n').slice(1);
            const parsedAdvisors = [];

            //save every advisor and add it to the advisorsArray
            rawAdvisors.forEach(element => {
                const advisorData = element.split(';')
                let advisor = {
                    id: uuidv4(),
                    Bedrijfsnaam: advisorData[0],
                    // Adres: `${advisorData[1]}, ${advisorData[2]}, ${advisorData[3]}`,
                    Adres: {
                        Straatnaam: advisorData[1],
                        //remove spces from postcode
                        Postcode: advisorData[2].replace(/\s+/g, ''),
                        Woonplaats: advisorData[3],

                    },
                    Website: {
                        Naam: advisorData[4].replace("https://www.", '').replace("http://www.", ''),
                        Url: advisorData[4],
                    }
                }
                parsedAdvisors.push(advisor)
            });
            return parsedAdvisors;
        })
}
