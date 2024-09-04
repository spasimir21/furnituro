interface FetchExecutorInput {
  url: URL;
  options: RequestInit;
}

const fetchExecutor = (input: FetchExecutorInput) => fetch(input.url, input.options);

export { fetchExecutor, FetchExecutorInput };
