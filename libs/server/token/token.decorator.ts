import { ExecutionContext, createParamDecorator } from '@nestjs/common';

const Token = createParamDecorator((_data: any, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().token);

export { Token };
