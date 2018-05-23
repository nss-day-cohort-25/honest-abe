// http://localhost:5000/politicianlegislations/1?_expand=politician&_expand=legislation
// http://localhost:5000/politicians/1?_embed=politicianlegislations
// http://localhost:5000/politicians?id=1&id=2
// http://localhost:5000/politicians?q=some_search_string

const params = (res,fk) => res.map(r => `${fk}=${r.id}`).join("&")

const unique = function* (arr, prop) {
    const map = new Map()
    let i = 0

    while (i < arr.length) {
        const key = arr[i][prop]
        if (!map.has(key) && map.set(key, 1)) yield arr[i]
        i++
    }
}

const allPoliticians = []

const politician = (id, firstName, lastName) => {
    return {
        id: id,
        name: `${firstName} ${lastName}`,
        bills: [],
        relatedPacs: []
    }
}


/*
    GOAL
    ----------------
    Display an HTML representation for EVERY politician showing
    the bills they have sponsored and any PACs that share interest
    with their sponsored bills
*/

// Get a politician
$.ajax("http://localhost:5000/politicians/")

    // Query legislation the politician has sponsored
    .then(politicians => {
        const promises = []


        politicians.forEach(p => {
            // Generate a politician object
            const currentPolitician = politician(p.id, p.name.first, p.name.last)

            // Push politician object into bucket
            allPoliticians.push(currentPolitician)

            // Query the API for all bills that the current politician sponsored
            promises.push($.ajax(`http://localhost:5000/politicianlegislations?politicianId=${p.id}&_expand=legislation`) )
        })

        return Promise.all(promises)

    })

    .then(allThePromises => {

        allThePromises.forEach(legislationArray => {
            legislationArray.forEach(l => {
                const foundIt = allPoliticians.find(p => {
                    return p.id === l.politicianId
                })
                foundIt.bills.push(l.legislation)
            })
        })


        console.log(allPoliticians)

        allPoliticians.forEach(p => {
            const profile = `
                <article class="politician">
                    <header class="politician__name">
                        <h1>${p.name}</h1>
                    </header>
                    <section class="politician__bills">
                        <h3>Sponsored Bills</h3>
                        <ol>
                            ${p.bills.map(b => `<li>${b.name}</li>`).join("")}
                        </ol>
                    </section>
                </article>
            `
            document.querySelector(".profile").innerHTML += profile
        })
    })