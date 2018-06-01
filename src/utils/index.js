export const pluralize = (count, word) => (count === 1 ? word : `${word} s`);

export const storage = (namespace, data) => {
  if (data) {
    try {
      return localStorage.setItem(namespace, JSON.stringify(data));
    } catch (error) {
      return undefined;
    }
  }

  const store = localStorage.getItem(namespace);

  try {
    return (store && JSON.parse(store)) || undefined;
  } catch (error) {
    return undefined;
  }
};

export const switchCase = cases => defaultCase => key =>
  Object.prototype.hasOwnProperty.call(cases, key) ? cases[key] : defaultCase;
