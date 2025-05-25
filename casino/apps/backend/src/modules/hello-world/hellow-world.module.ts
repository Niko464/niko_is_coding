import { Module } from '@nestjs/common';
import { HelloWorldResolver } from './hello-wolrd.resolver';

@Module({
  providers: [HelloWorldResolver],
})
export class HelloWorldModule {}
