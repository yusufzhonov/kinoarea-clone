export function render(arr, place, Component, box1 , box2){
     arr.forEach((item, index) => {
        const elem = Component(item, index, box1, box2)  

        place.append(elem)
    })
}