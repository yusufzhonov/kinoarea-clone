import { DetailedMovie } from "../../components/detailedMovie"
import { footer } from "../../components/footer"
import { header } from "../../components/header"
import { api } from "../../libs/api"

header()
footer()

const movieId = JSON.parse(localStorage.getItem("movieId"))

api.get(`/movie/${movieId}`).then(res => {
    DetailedMovie(res.data)
})
