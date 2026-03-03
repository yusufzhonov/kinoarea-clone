export function popularPeople(item, index, leftBoxs) {
    if (index < 2) {
        const leftBox = document.createElement('div');
        leftBox.className = 'left';
        leftBox.innerHTML = `
        <p class="parag">${index + 1} Place</p>
        <div class="boxik">
        <h4 class="h4">${item.name}</h4>
        <p class="name-p">${item.original_name}</p>
        </div>
        `;
        leftBox.querySelector(".parag").classList.add(`p-${index + 1}`);
        leftBoxs.append(leftBox);
    }
    return leftBoxs;
}

export function popularPeoples(item, index, leftBoxs, rightBoxs) {
    if (index > 1) {
        const rightBox = document.createElement('div');
        rightBox.className = 'r-box';
        rightBox.innerHTML = `
        <div class="names">
        <p class="pars">${item.name}</p>
        <p class="parags">${item.original_name}</p>
        </div>
        <p class="places">${index + 1} Place</p>
        `;
        rightBox.querySelector(".places").classList.add(`p-${index + 1}`);
        rightBoxs.append(rightBox);
    }

    return rightBoxs;
}