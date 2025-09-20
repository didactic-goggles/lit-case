const findMaxId = (arr) => {
  return Math.max(...arr.map((e) => e.id));
};

export const generateUUID = (arr, prevId = 0) => {
  let id = prevId ? prevId + 1 : findMaxId(arr) + 1;

  // not necessary to check if id is already in array
  // but it's a good practice to avoid duplicates
  while (arr.some((e) => e.id === id)) {
    generateUUID(arr, id);
  }

  return id;
};
