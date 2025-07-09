const removeDuplicate = (arr) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

const arr = [1, 1, 2, 6, 5, 5];
console.log(removeDuplicate(arr));
