let students = [
    { 
        name: "anuj",
        marks: { math: 87, science: 94, english: 78 }
    },
    { 
        name: "vivek",
        marks: { math: 63, science: 56, english: 70 } 
    },
    { 
        name: "zaid",
        marks: { math: 91, science: 79, english: 88 } }
];

let total = students.map(function(stu) {
    let total = stu.marks.math + stu.marks.science + stu.marks.english;
    return { name: stu.name, total: total };
});



let pass = total.filter(function(stu) {
    return stu.total > 199;
});



let classavg = total.reduce(function(acc, stu) {
    return acc + stu.total;
}, 0) / students.length;

console.log("Total:");
console.log(total);
console.log("Pass Students:");
console.log(pass);
console.log("class average = " + classavg);
