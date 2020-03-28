const arr = [
    [1, [2, 3, [4, 5]],
        [
            [6],
            [7, 8]
        ]
    ], 9
]
// // 输出[1,2,3,4,5,6,7,8,9]

// 直接递归
function flat1 (arr) {
    let ans = []
    arr.forEach(e => {
        Array.isArray(e) ? ans = ans.concat(flat1(e)) : ans.push(e)
    })
    return ans
}

// 使用reduce递归
let flat2 = arr =>
    arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flat2(cur) : cur), [])

// 使用生成器递归
function flat3 (arr) {
    let ans = []
    // 首先定义生成器
    // 这里不能使用foreach，因为foreach的参数只能接受普通函数，不能使用生成器函数
    let generator = function* (arr) {
        for (let i in arr) {
            // 如果在生成器中yield另一个生成器，必须使用yield*而不是yield
            Array.isArray(arr[i]) ? yield* flat3(arr[i]): yield arr[i]
        }
    }
    // 然后调用生成器
    for (let num of generator(arr)) {
        ans.push(num)
    }
    return ans
}
let a = flat1(arr);
console.log(a);
flat2(arr);
flat3(arr);


//
function add (a, b) {
    return a + b;
}
let currys = function (fn, args = []) {
    let length = fn.length; //计算期望函数的参数长度
    return function () {
      let  newArgs = [].slice.call(arguments); //将自身函数参数赋给新参数

        [].push.apply(newArgs, args); //将上回保留的参数push进新的数组

        if (newArgs.length < length) { //判断当前函数的参数是否与期望函数参数一致
            return currys.call(this, fn, newArgs); //如果不够，递归调用
        } else {

            return fn.apply(this, newArgs); // 如果够，就执行期望函数
        }
    }
}
let addcurry = currys(add);
console.log(addcurry(1)(2));