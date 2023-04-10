
// Создаем массив нужного нам кол-ва
export const getPagesArrays = (totalPage) => {
    let result = [];
    for (let i = 1; i <= totalPage; i++) {
        result.push(i)
    }
    return result;
}