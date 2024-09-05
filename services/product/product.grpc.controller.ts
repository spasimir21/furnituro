import { Controller, Inject } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
class ProductGRPCController {
  constructor(@Inject(ProductService) private readonly productService: ProductService) {}
}

export { ProductGRPCController };

