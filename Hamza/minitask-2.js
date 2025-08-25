// finding the largest number in an array

let arr = [3, 5, 7, 2, 8, -1, 54, 9, 84, -9, 0, 34, 23]

let largest = arr[0];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
    if (arr[i] > largest){
        largest = arr[i]
    }
}
console.log("The largest number is: " + largest)