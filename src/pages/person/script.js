import { DetailedPerson } from "../../components/detailedPerson"
import { footer } from "../../components/footer"
import { header } from "../../components/header"
import { api } from "../../libs/api"

header()
footer()

const personId = JSON.parse(localStorage.getItem("personId"))

api.get(`/person/${personId}`).then(res => {
    DetailedPerson(res.data)
})
