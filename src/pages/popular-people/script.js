import Swiper from 'swiper';
import { Scrollbar, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import { render } from '../../libs/render';
import { popularPeople, popularPeoples } from '../../components/popularity';
import { api } from '../../libs/api';

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


let mainBox = document.querySelector(".down-box")
let box1 = document.querySelector(".left-box")
let box2 = document.querySelector(".right-boxs")

api.get("/person/popular")
    .then(res => {
        render(res.data.results.slice(0, 6), mainBox, popularPeople, box1, box2)
        render(res.data.results.slice(0, 6), mainBox, popularPeoples, box1, box2)
    })