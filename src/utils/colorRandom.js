const list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
function randomIndex () {
    return Math.floor((Math.random() * list.length + 1))
}
export function getColor () {
    let color = '#'
    for (let i = 0; i < 6; i++) {
        let str = randomIndex()
        color += list[str - 1]
    }
    return color
}
