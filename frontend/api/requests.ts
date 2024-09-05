import { SuppressErrorNotificationConfig, sendErrorToNotification } from './errorToNotification';
import { Category } from '@services/category/interface/category.interface';
import { authEndpoints, serviceAuthenticatedExecutor } from './auth';
import { Service } from './services';
import {
  _delete,
  catchHttpError,
  combine,
  endpoint,
  endpoints,
  fetchInit,
  formBody,
  get,
  jsonBody,
  jsonResponse,
  patch,
  path,
  post,
  query,
  service,
  toHttpError,
  withConfig
} from '@libs/client/requestr';
import { CreateCategoryDto } from '@services/category/dto/createCategory.dto';
import { DeleteCategoryDto } from '@services/category/dto/deleteCategory.dto';
import { EditCategoryDto } from '@services/category/dto/editCategory.dto';

const product = endpoints(
  {
    request: service(Service.Product)
  },
  {}
);

const order = endpoints(
  {
    request: service(Service.Order)
  },
  {}
);

const feedback = endpoints(
  {
    request: service(Service.Feedback)
  },
  {}
);

const image = endpoints(
  {
    request: service(Service.Image)
  },
  {
    upload: endpoint<{ images: File[] }, { hashes: (string | null)[] }>({
      request: combine(post, path('/upload'), formBody),
      executor: serviceAuthenticatedExecutor(Service.Image),
      response: jsonResponse
    })
  }
);

const category = endpoints(
  {
    request: service(Service.Category)
  },
  {
    getAll: endpoint<void, Category[]>({
      request: combine(get, path('/')),
      response: jsonResponse
    }),
    delete: endpoint<DeleteCategoryDto, void>({
      request: combine(
        _delete,
        path<DeleteCategoryDto>(params => `/${params.id}`)
      ),
      executor: serviceAuthenticatedExecutor(Service.Category)
    }),
    create: endpoint<CreateCategoryDto, Category>({
      request: combine(post, path('/create'), jsonBody),
      executor: serviceAuthenticatedExecutor(Service.Category),
      response: jsonResponse
    }),
    edit: endpoint<EditCategoryDto & { id: string }, Category | null>({
      request: combine(
        patch,
        path<{ id: string }>(params => `/${params.id}`),
        jsonBody
      ),
      executor: serviceAuthenticatedExecutor(Service.Category),
      response: jsonResponse
    })
  }
);

const user = endpoints(
  {
    request: service(Service.User)
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
  { image, product, order, feedback, category, user, rating, auth: authEndpoints }
);

export { requests };

