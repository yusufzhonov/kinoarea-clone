import { DetailedMovie } from "../../components/detailedMovie"
import { footer } from "../../components/footer"
import { header } from "../../components/header"
import { api } from "../../libs/api"
import { render } from "../../libs/render"
import { SearchMovie } from "../../components/searchMovie"
import { searchPerson } from "../../components/searchPerson"

header()
footer()
let movieId = JSON.parse(localStorage.getItem("movieId"))

api.get(`/movie/${movieId}`)
.then(res=>{
    DetailedMovie(res.data)
})
let searchTypes = document.querySelectorAll(".type")
let searchInp = document.querySelector('.search-content')
let searchResults = document.querySelector(".render-box")
function changeType(type) {

    searchInp.onkeyup = () => {
        api.get(`/search/${type}?query=${searchInp.value}`)
            .then(res => {
                if(type == "movie"){
                    render(Object.values(res.data.results), searchResults, SearchMovie)
                } else if(type == "person") {
                    render(Object.values(res.data.results), searchResults, searchPerson)
                } else {
                    render(Object.values(res.data.results), searchResults, SearchMovie)
                }
            })
    }

}
changeType('movie')

searchTypes.forEach((type, i) => {
    type.onclick = () => {
        changeType(type.id)
    }
})