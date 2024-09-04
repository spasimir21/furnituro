const combine =
  (...builders: ((...args: any[]) => any)[]) =>
  async (requestOrResponse: any, ...args: any[]) => {
    for (const builder of builders) requestOrResponse = await builder(requestOrResponse, ...args);
    return requestOrResponse;
  };

export { combine };
