export function searchPerson(item) {
    const rightBox = document.createElement('div')
    rightBox.className = 'search-card search-person-card'
    rightBox.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w185${item.profile_path}" alt="" class="search-poster search-person-photo">
    <div class="search-info">
        <h2>${item.name}</h2>
        <p class="search-genres">${item.known_for_department || ''}</p>
    </div>`

    rightBox.onclick = () => {
        const overlay = document.querySelector(".overhide")
        if (overlay) {
            overlay.classList.remove("show")
            overlay.classList.add("hide")
        }
        localStorage.setItem("personId", item.id)
        window.location.href = "/person"
    }

    return rightBox
}