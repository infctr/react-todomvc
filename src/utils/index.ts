export const pluralize = (count: number, word: string) =>
  count === 1 ? word : `${word}s`;

export const storage = (namespace: string, data?: object) => {
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
