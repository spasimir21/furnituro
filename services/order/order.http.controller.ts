import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { EditOrderDto } from './dto/EditOrder.dto';
import { TokenGuard } from '@libs/server/token';
import { OrderService } from './order.service';
import { UseZodGuard } from 'nestjs-zod';

@Controller()
class OrderHTTPController {
  constructor(@Inject(OrderService) private readonly orderService: OrderService) {}

  @UseGuards(TokenGuard)
  @Get('/')
  async getAll() {
    return await this.orderService.getAll();
  }

  @UseZodGuard('body', CreateOrderDto)
  @Post('/')
  async create(@Body() input: CreateOrderDto) {
    return await this.orderService.create(input);
  }

  @UseZodGuard('body', EditOrderDto)
  @UseGuards(TokenGuard)
  @Patch('/:id')
  async edit(@Param('id') id: string, @Body() input: EditOrderDto) {
    return await this.orderService.edit(id, input);
  }

  @UseGuards(TokenGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.orderService.delete(id);
  }
}

export { OrderHTTPController };

