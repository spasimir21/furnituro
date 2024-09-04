interface IToken<T = any> {
  raw: string;
  data: T & { iat: number; exp: number };
}

const isTokenExpired = (token: IToken) => token.data.exp * 1000 < Date.now();

export { IToken, isTokenExpired };
