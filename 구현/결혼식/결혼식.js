const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
// const n = +input[0];
// const size = +input[1];
let list = new Map();
for (let i = 2; i < input.length; i++) {
  const [a, b] = input[i].split(" ");
  //   console.log(`a: ${a}, b: ${b}`);
  if (list.has(a)) {
    let val = list.get(a);
    if (val.every((e) => e !== b)) val.push(b);
    list.set(a, val);
  } else list.set(a, [b]);
  if (list.has(b)) {
    let val = list.get(b);
    if (val.every((e) => e !== a)) val.push(a);
    list.set(b, val);
  } else list.set(b, [a]);
  //   console.log(list);
}

// console.log(list);

const sangGeunFriends = list.get("1");
let sangGeunFriendsCopy = sangGeunFriends.slice();

function findFriendOfFriend(arr, sangGeunFriendsCopy) {
  for (let friend of arr) {
    if (friend !== "1" && sangGeunFriendsCopy.every((e) => e !== friend)) sangGeunFriendsCopy.push(friend);
  }
  return sangGeunFriendsCopy;
}

for (let sangGeunFriend of sangGeunFriends) {
  const arr = list.get(sangGeunFriend);
  sangGeunFriendsCopy = findFriendOfFriend(arr, sangGeunFriendsCopy);
}

console.log(sangGeunFriendsCopy.length);
