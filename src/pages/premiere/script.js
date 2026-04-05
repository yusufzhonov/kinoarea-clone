import { header } from '../../components/header'
import { footer } from '../../components/footer'
import { api } from '../../libs/api'
import { Movie } from '../../components/Movie'

header()
footer()

const grid = document.getElementById('listing-grid')
const pagination = document.getElementById('listing-pagination')

function loadPage(page) {
    grid.innerHTML = '<p style="color:#94a3b8;padding:40px 0;">Loading...</p>'
    api.get(`/movie/now_playing?page=${page}`).then(res => {
        grid.innerHTML = ''
        res.data.results.forEach(item => grid.appendChild(Movie(item)))
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
