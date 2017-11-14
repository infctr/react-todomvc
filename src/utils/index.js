export const pluralize = (count, word) => {
  return count === 1 ? word : word + 's';
};

export const store = (namespace, data) => {
  if (data) {
    return localStorage.setItem(namespace, JSON.stringify(data));
  }

  var store = localStorage.getItem(namespace);
  return (store && JSON.parse(store)) || [];
};
