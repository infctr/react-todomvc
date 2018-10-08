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

interface IAction {
  type: string;
  payload: any;
}

type IPayload<A extends IAction, T> = Extract<A, { type: T }>['payload'];

type ICases<A extends IAction, State> = {
  [T in A['type']]: (payload: IPayload<A, T>) => State
};

export const switchCase = <A extends IAction, State>(
  cases: ICases<A, State>
) => <D extends (payload: any) => State>(defaultCase: D) => {
  function getCase<K extends string>(key: K): (arg: IPayload<A, K>) => State;
  function getCase<K extends string>(key: K): ICases<A, State>[K] | D {
    return Object.prototype.hasOwnProperty.call(cases, key)
      ? cases[key]
      : defaultCase;
  }

  return getCase;
};
