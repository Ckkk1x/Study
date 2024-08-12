function calculateSum(a, b) {
    console.log("numbers: " + a + b);
}
setTimeout(calculateSum, 2000, 2, 3);

setInterval(calculateSum, 5000, 9, 1);