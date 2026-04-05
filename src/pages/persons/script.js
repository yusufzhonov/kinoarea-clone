import { header } from '../../components/header'
import { footer } from '../../components/footer'
import { api } from '../../libs/api'

header()
footer()

const grid = document.getElementById('listing-grid')
const pagination = document.getElementById('listing-pagination')

grid.classList.add('listing-grid--persons')

function renderPersons(persons) {
    grid.innerHTML = ''
    persons.forEach(person => {
        const card = document.createElement('div')
        card.className = 'person-card'

        if (person.profile_path) {
            const img = document.createElement('img')
            img.className = 'person-card-photo'
            img.src = `https://image.tmdb.org/t/p/w342${person.profile_path}`
            img.alt = person.name
            card.appendChild(img)
        } else {
            const placeholder = document.createElement('div')
            placeholder.className = 'person-card-photo-placeholder'
            placeholder.innerHTML = `
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                <span style="font-size:12px">© Kinoarea</span>
            `
            card.appendChild(placeholder)
        }

        const name = document.createElement('p')
        name.className = 'person-card-name'
        name.textContent = person.name

        const original = document.createElement('p')
        original.className = 'person-card-original'
        original.textContent = person.original_name || person.name

        card.appendChild(name)
        card.appendChild(original)

        card.onclick = () => {
            localStorage.setItem('personId', person.id)
            window.location.href = '/person'
        }

        grid.appendChild(card)
    })
}

function loadPage(page) {
    grid.innerHTML = '<p style="color:#94a3b8;padding:40px 0;">Loading...</p>'
    api.get(`/person/popular?page=${page}`).then(res => {
        renderPersons(res.data.results)
        buildPagination(res.data.total_pages > 100 ? 100 : res.data.total_pages, page)
    })
}

function buildPagination(total, current) {
    pagination.innerHTML = ''
    const pages = getPagesArray(current, total)
    pages.forEach(p => {
        const btn = document.createElement('button')
        btn.className = 'page-btn' + (p === current ? ' page-btn--active' : '')
        btn.textContent = p
        btn.onclick = () => { loadPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
        pagination.appendChild(btn)
    })
}

function getPagesArray(current, total) {
    const pages = []
    for (let i = 1; i <= Math.min(10, total); i++) pages.push(i)
    if (current > 10) { pages.push(99); pages.push(100) }
    return [...new Set(pages)]
}

loadPage(1)
