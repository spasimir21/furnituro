import { Controller, Inject } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller()
class OrderGRPCController {
  constructor(@Inject(OrderService) private readonly orderService: OrderService) {}
}

export { OrderGRPCController };

