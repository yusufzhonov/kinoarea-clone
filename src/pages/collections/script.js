import { header } from '../../components/header'
import { footer } from '../../components/footer'
import { api } from '../../libs/api'

header()
footer()

const grid = document.getElementById('listing-grid')

// Popular collection IDs from TMDB
const collectionIds = [
    { id: 645, name: 'James Bond Collection' },
    { id: 10, name: 'Star Wars Collection' },
    { id: 119, name: 'The Lord of the Rings Collection' },
    { id: 86311, name: 'The Avengers Collection' },
    { id: 131296, name: 'John Wick Collection' },
    { id: 748, name: 'Pirates of the Caribbean Collection' },
    { id: 1241, name: 'Harry Potter Collection' },
    { id: 9485, name: 'The Fast and the Furious Collection' },
    { id: 295130, name: 'The Conjuring Collection' },
    { id: 33514, name: 'Transformers Collection' },
]

const list = document.createElement('div')
list.className = 'collections-list'
grid.replaceWith(list)

collectionIds.forEach(({ id }) => {
    api.get(`/collection/${id}`).then(res => {
        const col = res.data
        const row = document.createElement('div')
        row.className = 'collection-row'

        const img = document.createElement('img')
        img.className = 'collection-img'
        img.src = col.backdrop_path
            ? `https://image.tmdb.org/t/p/w300${col.backdrop_path}`
            : (col.poster_path ? `https://image.tmdb.org/t/p/w300${col.poster_path}` : '')
        img.alt = col.name

        const info = document.createElement('div')
        info.className = 'collection-info'

        const name = document.createElement('p')
        name.className = 'collection-name'
        name.textContent = col.name

        const count = document.createElement('p')
        count.className = 'collection-count'
        count.textContent = `${col.parts?.length || 0} Movies`

        info.appendChild(name)
        info.appendChild(count)

        const btn = document.createElement('button')
        btn.className = 'collection-btn'
        btn.textContent = 'Show'
        btn.onclick = () => {
            localStorage.setItem('collectionId', col.id)
            localStorage.setItem('movieId', col.parts?.[0]?.id)
            window.location.href = '/movie'
        }

        row.appendChild(img)
        row.appendChild(info)
        row.appendChild(btn)
        list.appendChild(row)
    })
})
