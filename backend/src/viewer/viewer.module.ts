import { Module } from '@nestjs/common';
import { ViewerResolver } from './viewer.resolver';

@Module({
  providers: [ViewerResolver],
})
export class ViewerModule {}
