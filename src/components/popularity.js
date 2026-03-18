export function popularPeople(item, arr) {
    const leftBox = document.createElement('div')
    leftBox.className = 'pop-left'
    leftBox.innerHTML = `
        <p class="pop-place">${arr.indexOf(item) + 1} Place</p>
        <img src= "https://image.tmdb.org/t/p/original${item.profile_path}" alt="" class="popular-people-img">
        <div class="pop-name-box">
        <h4 class="h4">${item.name}</h4>
        <p class="pop-name-p">${item.original_name}</p>
        </div>
        `
    leftBox.querySelector(".pop-place").classList.add(`p-${arr.indexOf(item) + 1}`)
    return leftBox
}

export function popularPeoples(item, arr) {
    const rightBox = document.createElement('div')
    rightBox.className = 'pop-r-box'
    rightBox.innerHTML = `
    <img src= "https://image.tmdb.org/t/p/original${item.profile_path}" alt="" class="popular-people-img-right">
    <div class="pop-names-box">
        <p class="pop-name">${item.name}</p>
        <p class="pop-fullname">${item.original_name}</p>
        </div>
        <p class="pop-places">${arr.indexOf(item) + 3} Place</p>
        `;
    rightBox.querySelector(".pop-places").classList.add(`p-${arr.indexOf(item) + 3}`)
    return rightBox
}