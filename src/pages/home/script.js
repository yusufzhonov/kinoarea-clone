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

let first = 0
let second = 4
let page = 1

api.get("/person/popular")
    .then(res => {
        render(res.data.results.slice(0, 2), popular_people_box1, popularPeople)
        render(res.data.results.slice(2, 6), popular_people_box2, popularPeoples)
    })


api.get("movie/popular")
    .then(res => {
        render(Object.values(res.data.results), cardBox, Movie)
    })
api.get("movie/popular")
    .then(res => {
        render(Object.values(res.data.results).slice(0, 4), popular_movies_box, Movie)

        popular_movies_next_btn.onclick = () => {
            let movies = Object.values(res.data.results)
            first += 4;
            second += 4;
            page += 1;
            popular_movies_page.textContent = page

            if (first > 12) {
                first = 0;
                second = 4;
                page = 1;
                popular_movies_page.textContent = page
            }

            render(movies.slice(first, second), popular_movies_box, Movie);
        }
        popular_movies_last_btn.onclick = () => {
            let movies = Object.values(res.data.results)
            first -= 4;
            second -= 4;
            page -= 1;
            popular_movies_page.textContent = page

            if (first < 0) {
                first = 12;
                second = 16;
                page = 4;
                popular_movies_page.textContent = page
            }

            render(movies.slice(first, second), popular_movies_box, Movie);
        }

    })
    let movieGenre = document.querySelector(".genres")
api.get("/genre/movie/list")
    .then(res => {
        render(res.data.genres.slice(0, 6), geanre_list, genres)

    })
    let swiperWrapper = document.querySelector(".swiper-wrapper")
api.get("/movie/upcoming")
    .then(res => {
        render(res.data.results.slice(0, 4), upcomig_movies_box, Movie)
        render(res.data.results, swiperWrapper, Trailer)
        upcomig_movies_next_btn.onclick = () => {
            let movies = res.data.results
            first += 4;
            second += 4;
            page += 1;
            upcomig_movies_page.textContent = page

            if (first > 8) {
                first = 0;
                second = 4;
                page = 1;
                upcomig_movies_page.textContent = page
            }

            render(movies.slice(first, second), upcomig_movies_box, Movie);
        }
        upcomig_movies_last_btn.onclick = () => {
            let movies = Object.values(res.data.results)
            first -= 4;
            second -= 4;
            page -= 1;
            upcomig_movies_page.textContent = page

            if (first < 0) {
                first = 8;
                second = 12;
                page = 3;
                upcomig_movies_page.textContent = page
            }

            render(movies.slice(first, second), upcomig_movies_box, Movie);
        }
    })