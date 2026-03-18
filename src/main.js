import { router } from "./routing/router";

router()

let searchTypes = document.querySelectorAll(".type")
let searchInp = document.querySelector('.search-content')

function changeType(type) {
    console.log(type);

    searchInp.onkeyup = () => {
        api.get(`/search/${type}?query=${searchInp.value}`)
            .then(res => console.log(res))
    }

}

searchTypes.forEach((type, i) => {
    type.onclick = () => {
        changeType(type.id)
    }
})