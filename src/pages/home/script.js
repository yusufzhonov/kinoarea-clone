import Swiper from 'swiper'
import { Scrollbar, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/free-mode'
import { render } from '../../libs/render'
import { popularPeople, popularPeoples } from '../../components/popularity'
import { api } from '../../libs/api'
import { Movie } from "../../components/Movie"
import { PopularMovieSlide } from "../../components/PopularMovieSlide"
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
let cardBox     = document.querySelector(".card-box")
let geanre_list = document.querySelector(".genre-list")

// ─── Popular Movies: box → swiper ─────────────────────────────────────────

const POPULAR_TOTAL    = 16
const POPULAR_PER_VIEW = 4

let popularContainer = document.querySelector(".popular-movies-box")
popularContainer.classList.add("swiper", "popular-movies-swiper")

let popularWrapper = document.createElement("div")
popularWrapper.className = "swiper-wrapper"
popularContainer.appendChild(popularWrapper)

let popularSwiper = null

function buildPopularSwiper(movies) {
    if (popularSwiper) {
        popularSwiper.destroy(true, true)
        popularSwiper = null
    }
    popularWrapper.innerHTML = ""
    movies.slice(0, POPULAR_TOTAL).forEach(item => {
        popularWrapper.appendChild(PopularMovieSlide(item))
    })
    popularSwiper = new Swiper(".popular-movies-swiper", {
        modules: [FreeMode],
        slidesPerView: POPULAR_PER_VIEW,
        spaceBetween: 20,
        speed: 500,
        grabCursor: true,
        loop: false,
    })
}

function updatePopularPageLabel() {
    const el = document.querySelector(".popular-movies-page")
    if (!el || !popularSwiper) return
    el.textContent = Math.floor(popularSwiper.activeIndex / POPULAR_PER_VIEW) + 1
}

// ─── DOM refs ──────────────────────────────────────────────────────────────

let popular_movies_next_btn = document.querySelector(".popular-movies-next-btn")
let popular_movies_last_btn = document.querySelector(".popular-movies-last-btn")
let popular_movies_page_p   = document.querySelector(".popular-movies-page-p")

let upcomig_movies_box      = document.querySelector(".upcoming-movies-box")
let upcomig_movies_next_btn = document.querySelector(".upcoming-movies-next-btn")
let upcomig_movies_last_btn = document.querySelector(".upcoming-movies-last-btn")
let upcomig_movies_page_p   = document.querySelector(".upcoming-movies-page-p")

let trailerSwiperWrapper    = document.querySelector(".trailers__swiper .swiper-wrapper")

let upcomingPage       = 1
let upcomingTotalPages = 1

// ─── Загрузка ──────────────────────────────────────────────────────────────

Promise.all([
    api.get("/person/popular"),
    api.get("/movie/popular"),
    api.get("/genre/movie/list"),
    api.get("/movie/upcoming"),
])
.then(([personRes, popularMovieRes, genresRes, upcomigMovieRes]) => {

    render(personRes.data.results.slice(0, 2), popular_people_box1, popularPeople)
    render(personRes.data.results.slice(2, 6), popular_people_box2, popularPeoples)
    render(popularMovieRes.data.results, cardBox, Movie)

    buildPopularSwiper(popularMovieRes.data.results)

    const totalGroups = POPULAR_TOTAL / POPULAR_PER_VIEW
    popular_movies_page_p.innerHTML =
        `<span class="popular-movies-page">1</span>/${totalGroups}`

    upcomingTotalPages = Math.min(upcomigMovieRes.data.total_pages, 10)
    upcomig_movies_page_p.innerHTML =
        `<span class="upcoming-movies-page">1</span>/${upcomingTotalPages}`

    render(upcomigMovieRes.data.results.slice(0, 4), upcomig_movies_box, Movie)

    render(
        upcomigMovieRes.data.results.filter(m => m.backdrop_path).slice(0, 10),
        trailerSwiperWrapper,
        Trailer
    )

    new Swiper(".trailers__swiper", {
        direction: "horizontal",
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
            el: ".swiper-scrollbar",
            draggable: true,
        },
    })

    render(genresRes.data.genres.slice(0, 6), geanre_list, genres)
})

// ─── Popular Movies стрелки ────────────────────────────────────────────────

popular_movies_next_btn.onclick = () => {
    if (!popularSwiper) return
    popularSwiper.slideTo(
        popularSwiper.isEnd ? 0 : popularSwiper.activeIndex + POPULAR_PER_VIEW
    )
    setTimeout(updatePopularPageLabel, 520)
}

popular_movies_last_btn.onclick = () => {
    if (!popularSwiper) return
    popularSwiper.slideTo(
        popularSwiper.isBeginning ? POPULAR_TOTAL - POPULAR_PER_VIEW : popularSwiper.activeIndex - POPULAR_PER_VIEW
    )
    setTimeout(updatePopularPageLabel, 520)
}

// ─── Upcoming стрелки ──────────────────────────────────────────────────────

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

// ─── Search ────────────────────────────────────────────────────────────────

let searchTypes   = document.querySelectorAll(".type")
let searchInp     = document.querySelector(".search-content")
let searchResults = document.querySelector(".render-box")

function changeType(type) {
    searchInp.onkeyup = () => {
        api.get(`/search/${type}?query=${searchInp.value}`)
            .then(res => {
                if (type === "movie") {
                    render(Object.values(res.data.results), searchResults, SearchMovie)
                } else if (type === "person") {
                    render(Object.values(res.data.results), searchResults, searchPerson)
                } else {
                    render(Object.values(res.data.results), searchResults, SearchMovie)
                }
            })
    }
}

changeType("movie")
searchTypes.forEach(type => { type.onclick = () => changeType(type.id) })
