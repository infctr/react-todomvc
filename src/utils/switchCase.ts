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
