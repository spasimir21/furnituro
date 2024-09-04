class HTTPError extends Error {
  constructor(message: string, public readonly code: number, public readonly data: any = {}) {
    super(message);
  }
}

export { HTTPError };
