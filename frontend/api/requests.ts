import { SuppressErrorNotificationConfig, sendErrorToNotification } from './errorToNotification';
import { Category } from '@services/category/interface/category.interface';
import { authEndpoints, serviceAuthenticatedExecutor } from './auth';
import { Service } from './services';
import {
  catchHttpError,
  combine,
  endpoint,
  endpoints,
  fetchInit,
  get,
  jsonBody,
  jsonResponse,
  path,
  post,
  query,
  service,
  toHttpError,
  withConfig
} from '@libs/client/requestr';
import { CategoryNamesDto } from '@services/category/dto/categoryNames.dto';

const category = endpoints(
  {
    request: service(Service.Category)
  },
  {
    searchCategories: endpoint<string, string[]>({
      request: combine(
        get,
        path('/search'),
        query<string>('search', search => search)
      ),
      response: jsonResponse
    }),
    // TODO: Remove later
    ensureCategories: endpoint<CategoryNamesDto, Category[]>({
      request: combine(post, path('/ensure'), jsonBody),
      executor: serviceAuthenticatedExecutor(Service.Category),
      response: jsonResponse
    })
  }
);

const debate = endpoints(
  {
    request: service(Service.Debate)
  },
  {}
);

const user = endpoints(
  {
    request: service(Service.User)
  },
  {}
);

const argument = endpoints(
  {
    request: service(Service.Argument)
  },
  {}
);

const rating = endpoints(
  {
    request: service(Service.Rating)
  },
  {}
);

const requests = endpoints(
  withConfig<SuppressErrorNotificationConfig>({
    request: fetchInit,
    response: catchHttpError,
    error: combine(toHttpError, sendErrorToNotification)
  }),
  { category, debate, user, argument, rating, auth: authEndpoints }
);

export { requests };
