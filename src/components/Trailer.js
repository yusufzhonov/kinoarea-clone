import { api } from "../libs/api"

export function Trailer(item) {
    const slide = document.createElement("div")
    slide.className = "swiper-slide"

    const img = document.createElement("img")
    img.src = "https://image.tmdb.org/t/p/original" + item.backdrop_path
    img.alt = item.title

    const p = document.createElement("p")
    p.className = "swiper-slide__title"
    p.textContent = item.title

    slide.append(img, p)

    let iframe = document.querySelector(".new-trailer-video iframe")

    let trailersTitle = document.querySelector(".trailers__title")

    slide.onclick = () => {
        console.log(item);

        api.get(`/movie/${item.id}/videos`)
            .then(res => {
                let trailer = res.data.results.find(item => item.type == "Trailer")

                trailersTitle.textContent = item.title
                iframe.src = `https://www.youtube.com/embed/${trailer.key}`
            })
    }

    return slide
}
