// Flatten an array of arrays (used for many-to-many queries)
const flatten = (aoa) => {
    return aoa.reduce(
        function (accumulator, currentValue) {
            return accumulator.concat(currentValue);
        },
        []
    )
}

const PoliticianProfile = {
    name: "",
    bills: [],
    relatedPacs: []
}

// Get a politician
$.ajax("http://localhost:5000/politicians/1")

    // Query legislation the politician has sponsored
    .then(politician => {
        PoliticianProfile.name = `${politician.name.first} ${politician.name.last}`

        return $.ajax(`http://localhost:5000/politicianlegislations?politicianId=${politician.id}`)
    })

    // Query the interests for each sponsored legislation
    .then(bills => {
        const promises = []

        PoliticianProfile.bills = bills

        bills.forEach(bill => {
            promises.push($.ajax(`http://localhost:5000/legislationinterests?legislationId=${bill.id}`))
        })

        return Promise.all(promises)
    })

    // Query the PAC ids who share those interests
    .then(interests => {
        const promises = []

        flatten(interests).forEach(interest => {
            promises.push($.ajax(`http://localhost:5000/pacinterests?interestId=${interest.id}`))
        })

        return Promise.all(promises)
    })

    // Query for the details for each PAC that shares the interest of the legilation
    .then(pacinterests => {
        const promises = []

        flatten(pacinterests).forEach(pacinterest => {
            promises.push($.ajax(`http://localhost:5000/pacs/${pacinterest.pacId}`))
        })

        return Promise.all(promises)
    })

    // Display the details for each PAC
    .then(pacs => {
        PoliticianProfile.relatedPacs = pacs
        console.log(pacs);

    })
    .then(() => {
        // Build the HTML representation of the profile

    })