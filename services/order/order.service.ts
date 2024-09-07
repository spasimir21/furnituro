import { Order as PrismaOrder, OrderedProduct as PrismaOrderedProduct } from '@prisma/client';
import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { Order, OrderedProduct } from './interface/Order.interface';
import { OrderConfig } from './config';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { EditOrderDto } from './dto/EditOrder.dto';

const mapOrder = (order: PrismaOrder & { products: PrismaOrderedProduct[] }): Order => ({
  id: order.id,
  customer: {
    name: {
      first: order.first_name,
      last: order.last_name
    },
    company: order.company_name,
    phoneNumber: order.phone_number,
    email: order.email
  },
  address: {
    country: order.country,
    city: order.city,
    address: order.address,
    postalCode: order.postal_code
  },
  products: order.products.map(product => ({
    productId: product.product_id,
    quantity: product.quantity,
    priceForOne: product.price_for_one,
    size: product.size,
    color: product.color
  })),
  totalPrice: order.total_price,
  extraInformation: order.extra_information,
  isPaid: order.is_paid
});

@Injectable()
class OrderService {
  constructor(
    @Inject(OrderConfig) private readonly config: OrderConfig,
    private readonly prismaService: PrismaService
  ) {}

  async getAll() {
    const orders = await this.prismaService.order.findMany({ include: { products: true } });
    return orders.map(mapOrder);
  }

  private async filterOrderedProducts(inputProducts: CreateOrderDto['products']) {
    const products = await this.prismaService.product.findMany({
      where: { id: { in: inputProducts.map(product => product.productId) } }
    });

    const orderedProducts: OrderedProduct[] = [];

    for (const product of inputProducts) {
      const dbProduct = products.find(p => p.id === product.productId);
      if (dbProduct == null || !dbProduct.sizes.includes(product.size) || !dbProduct.colors.includes(product.color))
        continue;

      const orderedProduct: OrderedProduct = {
        ...product,
        quantity: Math.min(dbProduct.quantity, dbProduct.quantity),
        priceForOne: dbProduct.price
      };

      if (orderedProduct.quantity == 0) continue;

      orderedProducts.push(orderedProduct);
    }

    const totalPrice = orderedProducts.reduce((total, product) => total + product.priceForOne * product.quantity, 0);

    return { orderedProducts, totalPrice };
  }

  async create(input: CreateOrderDto) {
    const { orderedProducts, totalPrice } = await this.filterOrderedProducts(input.products);

    const order = await this.prismaService.order.create({
      data: {
        products: {
          create: orderedProducts.map(product => ({
            product_id: product.productId,
            price_for_one: product.priceForOne,
            quantity: product.quantity,
            size: product.size,
            color: product.color
          }))
        },
        total_price: totalPrice,
        first_name: input.customer.name.first,
        last_name: input.customer.name.last,
        company_name: input.customer.company,
        country: input.address.country,
        city: input.address.city,
        address: input.address.address,
        postal_code: input.address.postalCode,
        phone_number: input.customer.phoneNumber,
        email: input.customer.email,
        extra_information: input.extraInformation
      },
      include: { products: true }
    });

    await this.updateProductQuantities(
      Object.fromEntries(orderedProducts.map(product => [product.productId, -product.quantity] as const))
    );

    return mapOrder(order);
  }

  async edit(orderId: string, input: EditOrderDto) {
    const order = await this.prismaService.order.findFirst({
      where: {
        id: orderId,
        is_paid: false
      },
      include: { products: true }
    });

    if (order == null) return null;

    const orderProductInfo = input.products != null ? await this.filterOrderedProducts(input.products) : null;

    const newOrder = await this.prismaService.order.update({
      where: { id: orderId },
      data: {
        products:
          orderProductInfo?.orderedProducts == null
            ? undefined
            : {
                create: orderProductInfo.orderedProducts.map(product => ({
                  product_id: product.productId,
                  price_for_one: product.priceForOne,
                  quantity: product.quantity,
                  size: product.size,
                  color: product.color
                }))
              },
        total_price: orderProductInfo?.totalPrice,
        first_name: input.customer?.name?.first,
        last_name: input.customer?.name?.last,
        company_name: input.customer?.company,
        country: input.address?.country,
        city: input.address?.city,
        address: input.address?.address,
        postal_code: input.address?.postalCode,
        phone_number: input.customer?.phoneNumber,
        email: input.customer?.email,
        extra_information: input.extraInformation
      },
      include: { products: true }
    });

    if (orderProductInfo != null) {
      await this.prismaService.orderedProduct.deleteMany({
        where: { id: { in: order.products.map(p => p.id) } }
      });

      const quantities: Record<string, number> = {};

      for (const product of order.products) {
        if (!(product.product_id in quantities)) quantities[product.product_id] = 0;
        quantities[product.product_id] += product.quantity;
      }

      for (const product of orderProductInfo.orderedProducts) {
        if (!(product.productId in quantities)) quantities[product.productId] = 0;
        quantities[product.productId] -= product.quantity;
      }

      await this.updateProductQuantities(quantities);
    }

    return mapOrder(newOrder);
  }

  private async markOrderAsPaid(id: string) {
    await this.prismaService.order.update({
      where: { id },
      data: { is_paid: true }
    });
  }

  async delete(id: string) {
    const order = await this.prismaService.order.findFirst({
      where: { id, is_paid: false },
      include: { products: true }
    });

    if (order == null) return;

    await this.prismaService.order.delete({ where: { id } });

    await this.updateProductQuantities(
      Object.fromEntries(order.products.map(product => [product.id, product.quantity] as const))
    );
  }

  private async updateProductQuantities(quantities: Record<string, number>) {
    await this.prismaService.$transaction(
      Object.keys(quantities).map(id =>
        this.prismaService.product.update({
          where: { id },
          data: { quantity: { increment: quantities[id] } }
        })
      )
    );
  }
}

export { OrderService };

