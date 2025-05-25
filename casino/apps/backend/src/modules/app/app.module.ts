import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaModule } from '../prisma/prisma.module';
import { HelloWorldModule } from '../hello-world/hellow-world.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      path: '/graphql',
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    PrismaModule,
    HelloWorldModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
