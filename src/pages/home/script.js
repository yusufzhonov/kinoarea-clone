import Swiper from 'swiper';
import { Scrollbar, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import { render } from '../../libs/render';
import { popularPeople, popularPeoples } from '../../components/popularity';
import { api } from '../../libs/api';
import { Movie } from "../../components/Movie";
import { header } from '../../components/header';
import { footer } from '../../components/footer';
// import { genres } from '../../components/genres';
import { Trailer } from '../../components/Trailer';
import { genres } from '../../components/Genres';
header()
footer()

const swiper = new Swiper('.trailers__swiper', {
    direction: 'horizontal',
    loop: false,
    modules: [Scrollbar, FreeMode],

    slidesPerView: 4,
    spaceBetween: 20,
    grabCursor: true,
    //   resistanceRatio: 0,

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
});


let popular_people_box1 = document.querySelector(".pop-people-left-box")
let popular_people_box2 = document.querySelector(".pop-people-right-box")

let cardBox = document.querySelector(".card-box")
let geanre_list = document.querySelector(".genre-list")

let popular_movies_box = document.querySelector(".popular-movies-box")
let popular_movies_next_btn = document.querySelector(".popular-movies-next-btn")
let popular_movies_last_btn = document.querySelector(".popular-movies-last-btn")
let popular_movies_page = document.querySelector(".popular-movies-page")

let upcomig_movies_box = document.querySelector(".upcoming-movies-box")
let upcomig_movies_next_btn = document.querySelector(".upcoming-movies-next-btn")
let upcomig_movies_last_btn = document.querySelector(".upcoming-movies-last-btn")
let upcomig_movies_page = document.querySelector(".upcoming-movies-page")

let search_waindow_btn = document.querySelector(".search")
let search_waindow = document.querySelector(".overhide")
let close_search_window = document.querySelector(".close-search-window")

search_waindow_btn.onclick = () => {
    search_waindow.classList.add("show")
    search_waindow.classList.remove("hide")
}
close_search_window.onclick = () => {
    search_waindow.classList.remove("show")
    search_waindow.classList.add("hide")
}

let popularApi = api.get("/person/popular")
let popularMovies = api.get("movie/popular")
let movieGenre = document.querySelector(".genres")
let genresApi = api.get("/genre/movie/list")
let swiperWrapper = document.querySelector(".swiper-wrapper")
let upcomingMovies = api.get("/movie/upcoming")

Promise.all([popularApi, popularMovies, genresApi, upcomingMovies])
    .then(([peopleRes, popularRes, genresRes, upcomingRes]) => {
        render(peopleRes.data.results.slice(0, 2), popular_people_box1, popularPeople)
        render(peopleRes.data.results.slice(2, 6), popular_people_box2, popularPeoples)

        render(popularRes.data.results, cardBox, Movie)
        render(popularRes.data.results.slice(0, 4), popular_movies_box, Movie)

        render(genresRes.data.genres.slice(0, 6), geanre_list, genres)

        render(upcomingRes.data.results.slice(0, 4), upcomig_movies_box, Movie)
        render(upcomingRes.data.results, swiperWrapper, Trailer)
    })
    .catch(err => console.error(err))
