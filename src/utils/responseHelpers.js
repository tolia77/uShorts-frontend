export function entityErrorsToArray(data) {
    let arr = Object.keys(data)
    let result = []
    arr.forEach((key) => {
        result.push(`${key}: ${data[key]}`)
    })
    return result;
}