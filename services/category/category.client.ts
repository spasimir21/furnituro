import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { Category } from './interface/category.interface';
import { Observable } from 'rxjs';

const CATEGORY_CLIENT = Symbol('$CategoryClient');

interface CategoryClient {
  createCategory(request: CreateCategoryDto): Observable<Category>;
}

// TODO: Add credentials
const CategoryClientModule = ClientsModule.register([
  {
    name: CATEGORY_CLIENT,
    transport: Transport.GRPC,
    options: {
      package: 'category',
      protoPath: './proto/category.proto',
      url: `furnituro-category:${process.env.SERVICE_PORT}`
    }
  }
]);

const getCategoryClient = (client: ClientGrpc) => client.getService<CategoryClient>('CategoryService');

export { CATEGORY_CLIENT, CategoryClientModule, CategoryClient, getCategoryClient };

