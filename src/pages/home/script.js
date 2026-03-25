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

header()
footer()

let popular_people_box1 = document.querySelector(".pop-people-left-box")
let popular_people_box2 = document.querySelector(".pop-people-right-box")
let cardBox     = document.querySelector(".card-box")
let geanre_list = document.querySelector(".genre-list")

// Popular Movies swiper

const POPULAR_TOTAL    = 16
const POPULAR_PER_VIEW = 4

let popularContainer = document.querySelector(".popular-movies-box")
popularContainer.classList.add("swiper", "popular-movies-swiper")

let popularWrapper = document.createElement("div")
popularWrapper.className = "swiper-wrapper"
popularContainer.appendChild(popularWrapper)

let popularSwiper = null

function buildPopularSwiper(movies) {
    if (popularSwiper) { popularSwiper.destroy(true, true); popularSwiper = null }
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

// Upcoming Movies swiper

const UPCOMING_TOTAL    = 6
const UPCOMING_PER_VIEW = 3

let upcomingContainer = document.querySelector(".upcoming-movies-box")
upcomingContainer.classList.add("swiper", "upcoming-movies-swiper")

let upcomingWrapper = document.createElement("div")
upcomingWrapper.className = "swiper-wrapper"
upcomingContainer.appendChild(upcomingWrapper)

let upcomingSwiper = null

function buildUpcomingSwiper(movies) {
    if (upcomingSwiper) { upcomingSwiper.destroy(true, true); upcomingSwiper = null }
    upcomingWrapper.innerHTML = ""
    movies.slice(0, UPCOMING_TOTAL).forEach(item => {
        upcomingWrapper.appendChild(PopularMovieSlide(item))
    })
    upcomingSwiper = new Swiper(".upcoming-movies-swiper", {
        modules: [FreeMode],
        slidesPerView: UPCOMING_PER_VIEW,
        spaceBetween: 20,
        speed: 500,
        grabCursor: true,
        loop: false,
    })
}

function updateUpcomingPageLabel() {
    const el = document.querySelector(".upcoming-movies-page")
    if (!el || !upcomingSwiper) return
    el.textContent = Math.floor(upcomingSwiper.activeIndex / UPCOMING_PER_VIEW) + 1
}

// DOM refs

let popular_movies_next_btn = document.querySelector(".popular-movies-next-btn")
let popular_movies_last_btn = document.querySelector(".popular-movies-last-btn")
let popular_movies_page_p   = document.querySelector(".popular-movies-page-p")

let upcoming_movies_next_btn = document.querySelector(".upcoming-movies-next-btn")
let upcoming_movies_last_btn = document.querySelector(".upcoming-movies-last-btn")
let upcoming_movies_page_p   = document.querySelector(".upcoming-movies-page-p")

let trailerSwiperWrapper = document.querySelector(".trailers__swiper .swiper-wrapper")

// API calls

Promise.all([
    api.get("/person/popular"),
    api.get("/movie/popular"),
    api.get("/genre/movie/list"),
    api.get("/movie/upcoming"),
])
.then(([personRes, popularMovieRes, genresRes, upcomingMovieRes]) => {

    render(personRes.data.results.slice(0, 2), popular_people_box1, popularPeople)
    render(personRes.data.results.slice(2, 6), popular_people_box2, popularPeoples)
    render(popularMovieRes.data.results, cardBox, Movie)

    // Popular swiper
    buildPopularSwiper(popularMovieRes.data.results)
    const totalPopularGroups = Math.ceil(POPULAR_TOTAL / POPULAR_PER_VIEW)
    popular_movies_page_p.innerHTML =
        `<span class="popular-movies-page">1</span>/${totalPopularGroups}`

    // Upcoming swiper
    buildUpcomingSwiper(upcomingMovieRes.data.results)
    const totalUpcomingGroups = Math.ceil(UPCOMING_TOTAL / UPCOMING_PER_VIEW)
    upcoming_movies_page_p.innerHTML =
        `<span class="upcoming-movies-page">1</span>/${totalUpcomingGroups}`

    // Trailers swiper
    render(
        upcomingMovieRes.data.results.filter(m => m.backdrop_path).slice(0, 10),
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

// Popular Movies arrows

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
        popularSwiper.isBeginning
            ? POPULAR_TOTAL - POPULAR_PER_VIEW
            : popularSwiper.activeIndex - POPULAR_PER_VIEW
    )
    setTimeout(updatePopularPageLabel, 520)
}

// Upcoming Movies arrows

upcoming_movies_next_btn.onclick = () => {
    if (!upcomingSwiper) return
    upcomingSwiper.slideTo(
        upcomingSwiper.isEnd ? 0 : upcomingSwiper.activeIndex + UPCOMING_PER_VIEW
    )
    setTimeout(updateUpcomingPageLabel, 520)
}

upcoming_movies_last_btn.onclick = () => {
    if (!upcomingSwiper) return
    upcomingSwiper.slideTo(
        upcomingSwiper.isBeginning
            ? UPCOMING_TOTAL - UPCOMING_PER_VIEW
            : upcomingSwiper.activeIndex - UPCOMING_PER_VIEW
    )
    setTimeout(updateUpcomingPageLabel, 520)
}
