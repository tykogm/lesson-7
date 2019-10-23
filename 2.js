/**
 * Задача 2.
 *
 * Напишите функцию `collect`, которая будет принимать массив в качестве аргумента,
 * и возвращать число.
 * Массив, который передаётся в аргументе может быть одноуровневым или многоуровневым.
 * Число, которое возвращает функция должно быть суммой всех элементов
 * на всех уровнях всех вложенных массивов.
 *
 * Если при проходе всех уровней не было найдено ни одного числа,
 * то функция должна возвращать число 0.
 *
 * Условия:
 * - Обязательно использовать встроенный метод массива reduce.
 * 
 * Генерировать ошибки, если:
 * - При вызове функции не был передан один аргумент;
 * - В качестве первого аргумента был передан не массив;
 * - Если на каком-то уровне было найдено не число и не массив.
 */

// Решение
function checkDepth(arr) {
    let max = 0;
    for( const item of arr) {
        if (Array.isArray(item)) {
            const incr = checkDepth(item);
            if( incr === 0 ) {
                return 0;
            }
            max = max < incr ? incr : max;
        } else if (typeof item === "number") {
            max = max < 1 ? 1 : max;
        } else {
            return 0;
        }
    }
    return ++max;
}

function collect(array) {

    if (arguments.length !== 1) {
        return "При вызове функции не был передан один аргумент";
    }
    if (!Array.isArray(array)) {
        return "В качестве первого аргумента был передан не массив";
    }

    let depth = checkDepth(array);
    if (depth === 0) {
        return "на каком-то уровне было найдено не число и не массив";
    }

    const reducer = (accumulator, currentValue) => { return accumulator + currentValue };
    const arr2 = array.flat(depth);
    return arr2.reduce(reducer);
}

const array1 = [[[1, 2], [1, 2]], [[2, 1], [1, 2]]];
console.log(collect(array1)); // 12

const array2 = [[[[[1, 2]]]]];
console.log(collect(array2)); // 3

const array3 = [[[[[1, 2]]], 2], 1];
console.log(collect(array3)); // 6

const array4 = [[[[[]]]]];
console.log(collect(array4)); // 0

const array5 = [[[[[], 3]]]];
console.log(collect(array5)); // 3

exports.collect = collect;
