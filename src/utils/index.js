export const pluralize = (count, word) => {
  return count === 1 ? word : word + 's';
};

export const storage = (namespace, data) => {
  if (data) {
    try {
      return localStorage.setItem(namespace, JSON.stringify(data));
    } catch (error) {
      return void 0;
    }
  }

  let store = localStorage.getItem(namespace);

  try {
    return (store && JSON.parse(store)) || void 0;
  } catch (error) {
    return void 0;
  }
};
