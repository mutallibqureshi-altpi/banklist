// challenge 1
const arr = [8, 5, 6, 48, 52, 1, 2, 3];
const arr1 = [100, 200, 150, 120, 123, 130, 220, 300];

const checkDog = (julia, kate) => {
  // const arr2 = [...julia];
  const arr2 = julia.splice();
  arr2.splice(0, 1);
  arr2.splice(-2);
  const result = arr2.concat(kate);
  result.map((data, i) =>
    data > 3
      ? console.log(`Dog no ${i + 1} is an adult and is ${data} yrs old`)
      : console.log(`Dog no ${i + 1} is still a puppy`)
  );
};

checkDog(arr, arr1);

const add = arr.reduce((acc, curr) => acc + curr, 0);
console.log(add);

const euro = 1.1;
const convert = arr1.map((val) => {
  const output = val * euro;
  const res = output.toFixed(2);
  return res;
});
console.log(convert);

const abc = [1, 2, 3, 300, 500, 100, 9000, 20, 10, 12];
const xyz = abc.reduce((acc, curr) => (acc > curr ? acc : curr), abc[0]);
console.log(xyz);

// CHALLENGE 2
const sum = [5, 2, 4, 1, 5, 15, 8, 3];
const avgHumanAge = (age) => {
  const humanAge = age
    .map((val) => (val <= 2 ? val * 2 : 16 + val + 4))
    .filter((val) => val >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
  return humanAge;
};
console.log(avgHumanAge(sum));
