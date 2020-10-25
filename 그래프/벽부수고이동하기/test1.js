const visit = [
  [true, false, false],
  [false, false, false],
  [false, false, false],
];

const v1 = visit.slice().map((e) => e.slice());
v1[2][2] = true;
console.log("v1:", v1);
console.log("visit:", visit);

// const visited = [
//   [true, false, false],
//   [false, false, false],
//   [false, false, false],
// ];

// const a1 = {
//   cnt: 1,
//   destroy: true,
//   visit: visited,
// };

// const copyVisit = a1.visit.slice();

// let a2 = {
//   cnt: (a1.cnt += 1),
//   destroy: a1.destroy,
//   visit: copyVisit,
// };

// a2.visit[2][2] = true;
// console.log("a1:", a1);
// console.log("a2:", a2);
