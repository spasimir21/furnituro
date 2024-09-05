import { Controller, Inject } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
class ProductHTTPController {
  constructor(@Inject(ProductService) private readonly productService: ProductService) {}
}

export { ProductHTTPController };

