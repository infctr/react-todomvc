declare module 'localStorage' {
  export function setItem(key: string, data: any): void;
  export function getItem(key: string): any;
}
