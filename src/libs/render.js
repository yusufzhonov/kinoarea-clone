export function render(arr, place, Component) {
    place.innerHTML=""
    for (const item of arr) {
        let elem = Component(item)
        place.append(elem)
    }
}