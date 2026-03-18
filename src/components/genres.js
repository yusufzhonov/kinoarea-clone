import { api } from "../libs/api"
import { render } from "../libs/render"
import { Movie } from "./Movie"

export function genres(item, arr) {
    let cardBox = document.querySelector(".card-box")
    let li = document.createElement(`li`)
    let btn = document.createElement(`div`)

    btn.className = "search-category"
    btn.textContent = item.name

    if (arr.indexOf(item) === 0) {
        btn.classList.add("active")
    }

    li.append(btn)

    btn.onclick = () => {
        document.querySelectorAll(".search-category").forEach(el => el.classList.remove("active"))
        btn.classList.add("active")

        api.get(`/discover/movie?with_genres=${item.id}`)
            .then(res => {
                render(res.data.results, cardBox, Movie)
            })
    }

    return li
}
