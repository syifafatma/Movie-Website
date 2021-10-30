let data = []

const buildList = (data, search = "") => {
    let html = ''

    console.log(search)

    if (search) {
        console.log("Search ", data.find(o => o.title === search))
        newData = []
        data.forEach((movie, index) => {
            if (movie.title.toLowerCase().includes(search.toLowerCase())) {
                newData[newData.length] = movie
            }
        })

        data = newData
    }

    if (data.length > 0) {
        data.forEach((movie, index) => {
            html += `
            <li class="item" onclick="run(${index})">
                <img src="${movie.posterurl}" alt="Dummy">
                <h1 class="title">${movie.title} (${movie.year})</h1>
                
            </li>
            `
        })
    } else {
        html += `
            <p>Not found.</p>
        `
    }

    return html
}

const run = (id) => {
    const modal = document.querySelector('.modal')
    const body = document.querySelector('body')
    const image = document.querySelector('#modal-img')
    const title = document.querySelector('#modal-title')
    const description = document.querySelector('#modal-description')
    console.log(id)

    modal.classList.replace('hide', 'show')
    body.style.overflow = 'hidden'

    const movie = data[id]

    title.textContent = `${movie.title} (${movie.year})` 
    description.textContent = `${movie.storyline})` 
    image.src = movie.posterurl
}

const searchData = () => {
    const input = document.querySelector('#search')

    fetch('assets/source/movies.json')
    .then(response => response.json())
    .then(json => {
        data = json
        const root = document.querySelector('.movie-list')
        console.log(root)
        root.innerHTML = buildList(data, input.value)
    })
    .catch(err => console.error(err))
}

fetch('assets/source/movies.json' )
    .then(response => response.json())
    .then(json => {
        data = json
        const root = document.querySelector('.movie-list')
        console.log(root)
        root.innerHTML = buildList(data)
    })
    .catch(err => console.error(err))

const closeModal = () => {
    const modal = document.querySelector('.modal')
    const body = document.querySelector('body')

    modal.classList.replace('show', 'hide')
    body.style.overflow = 'auto'
}