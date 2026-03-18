import Swiper from 'swiper'
import { Scrollbar, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/free-mode'
import { render } from '../../libs/render'
import { popularPeople, popularPeoples } from '../../components/popularity'
import { api } from '../../libs/api'
import { Movie } from "../../components/Movie"
import { header } from '../../components/header'
import { footer } from '../../components/footer'
import { Trailer } from '../../components/Trailer'
import { genres } from '../../components/genres'
import { SearchMovie } from '../../components/searchMovie'
import { searchPerson } from '../../components/searchPerson'

header()
footer()

let popular_people_box1 = document.querySelector(".pop-people-left-box")
let popular_people_box2 = document.querySelector(".pop-people-right-box")

let cardBox = document.querySelector(".card-box")
let geanre_list = document.querySelector(".genre-list")

let popular_movies_box = document.querySelector(".popular-movies-box")
let popular_movies_next_btn = document.querySelector(".popular-movies-next-btn")
let popular_movies_last_btn = document.querySelector(".popular-movies-last-btn")
let popular_movies_page = document.querySelector(".popular-movies-page")
let popular_movies_page_p = document.querySelector(".popular-movies-page-p")

let upcomig_movies_box = document.querySelector(".upcoming-movies-box")
let upcomig_movies_next_btn = document.querySelector(".upcoming-movies-next-btn")
let upcomig_movies_last_btn = document.querySelector(".upcoming-movies-last-btn")
let upcomig_movies_page = document.querySelector(".upcoming-movies-page")
let upcomig_movies_page_p = document.querySelector(".upcoming-movies-page-p")

let swiperWrapper = document.querySelector(".swiper-wrapper")

let popularPage = 1
let upcomingPage = 1
let popularTotalPages = 1
let upcomingTotalPages = 1

let swiper = null

let personApi = api.get("/person/popular")
let popularMovieApi = api.get("movie/popular")
let genresApi = api.get("/genre/movie/list")
let upcomigMovieApi = api.get("/movie/upcoming")

Promise.all([personApi, popularMovieApi, genresApi, upcomigMovieApi])
.then(([personRes, popularMovieRes, genresRes, upcomigMovieRes]) => {

    render(personRes.data.results.slice(0, 2), popular_people_box1, popularPeople)
    render(personRes.data.results.slice(2, 6), popular_people_box2, popularPeoples)

    render(popularMovieRes.data.results, cardBox, Movie)
    render(popularMovieRes.data.results.slice(0, 4), popular_movies_box, Movie)

    popularTotalPages = Math.min(popularMovieRes.data.total_pages, 10)
    popular_movies_page_p.innerHTML = `<span class="popular-movies-page">1</span>/${popularTotalPages}`

    upcomingTotalPages = Math.min(upcomigMovieRes.data.total_pages, 10)
    upcomig_movies_page_p.innerHTML = `<span class="upcoming-movies-page">1</span>/${upcomingTotalPages}`

    upcomig_movies_page = document.querySelector(".upcoming-movies-page")
    popular_movies_page = document.querySelector(".popular-movies-page")

    render(upcomigMovieRes.data.results.slice(0, 4), upcomig_movies_box, Movie)

    render(upcomigMovieRes.data.results.filter(m => m.backdrop_path).slice(0, 10), swiperWrapper, Trailer)

    swiper = new Swiper('.trailers__swiper', {
        direction: 'horizontal',
        loop: false,
        modules: [Scrollbar, FreeMode],
        slidesPerView: 4.5,
        spaceBetween: 20,
        grabCursor: true,
        freeMode: {
            enabled: true,
            momentum: true,
            momentumRatio: 0,
            momentumVelocityRatio: 0,
            momentumBounce: false,
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
    })

    render(genresRes.data.genres.slice(0, 6), geanre_list, genres)
})

popular_movies_next_btn.onclick = () => {
    popularPage = popularPage >= popularTotalPages ? 1 : popularPage + 1
    document.querySelector(".popular-movies-page").textContent = popularPage
    api.get(`/movie/popular?page=${popularPage}`)
        .then(res => render(res.data.results.slice(0, 4), popular_movies_box, Movie))
}

popular_movies_last_btn.onclick = () => {
    if (popularPage <= 1) return
    popularPage--
    document.querySelector(".popular-movies-page").textContent = popularPage
    api.get(`/movie/popular?page=${popularPage}`)
        .then(res => render(res.data.results.slice(0, 4), popular_movies_box, Movie))
}

upcomig_movies_next_btn.onclick = () => {
    if (upcomingPage >= upcomingTotalPages) return
    upcomingPage++
    document.querySelector(".upcoming-movies-page").textContent = upcomingPage
    api.get(`/movie/upcoming?page=${upcomingPage}`)
        .then(res => render(res.data.results.slice(0, 4), upcomig_movies_box, Movie))
}

upcomig_movies_last_btn.onclick = () => {
    if (upcomingPage <= 1) return
    upcomingPage--
    document.querySelector(".upcoming-movies-page").textContent = upcomingPage
    api.get(`/movie/upcoming?page=${upcomingPage}`)
        .then(res => render(res.data.results.slice(0, 4), upcomig_movies_box, Movie))
}

let searchTypes = document.querySelectorAll(".type")
let searchInp = document.querySelector('.search-content')
let searchResults = document.querySelector(".render-box")

function changeType(type) {
    searchInp.onkeyup = () => {
        api.get(`/search/${type}?query=${searchInp.value}`)
            .then(res => {
                if (type == "movie") {
                    render(Object.values(res.data.results), searchResults, SearchMovie)
                } else if (type == "person") {
                    render(Object.values(res.data.results), searchResults, searchPerson)
                } else {
                    render(Object.values(res.data.results), searchResults, SearchMovie)
                }
            })
    }
}

changeType('movie')

searchTypes.forEach((type) => {
    type.onclick = () => {
        changeType(type.id)
    }
})
