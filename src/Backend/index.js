let addMe = "addMee";
let arr = ["1", "8", "4"];

const length = (arr) => {
  let counter = 0;
  for (let b = 0; b < length(arr); b++) {
    return counter++;
  }
  return counter;
};
const join = (arr, el) => {
  let str = "";
  for (let b = 0; b < length(arr); b++) {
    str = str + el + arr[b];
  }
  return str;
};
let push = (arr, value) => {
  let newArr = [];
  newArr = join(arr, ",") + "," + value;
  return newArr.split(",");
};
arr = push(arr, addMe);
console.log(arr);
