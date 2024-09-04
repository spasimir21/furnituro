import { Result } from '../../shared/utils/result';

function handleNullInController<T>(value: T | null, errorMessage: string, res: any, errorCode = 400) {
  if (value == null) return res.status(errorCode).send(errorMessage);
  res.status(200).send(value);
}

function unwrapResultInController<T>({ value, error }: Result<T>, res: any, errorCode = 400) {
  if (error) return res.status(errorCode).send(error.message);
  res.status(200).send(value);
}

export { handleNullInController, unwrapResultInController };
