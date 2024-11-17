import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MessagesModule } from './messages/messages.module';
import { ChatsModule } from './chats/chats.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ViewerModule } from './viewer/viewer.module';

@Module({
  imports: [
    ViewerModule,
    UsersModule,
    ChatsModule,
    MessagesModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [AuthService],
      useFactory: async (authService: AuthService) => ({
        autoSchemaFile: true,
        installSubscriptionHandlers: true,
        subscriptions: {
          'graphql-ws': {
            onConnect: async (context) => {
              const { connectionParams, extra } = context;

              const authToken = connectionParams.authorization;
              if (authToken) {
                const user = await authService.getUserFromToken(
                  authToken as string,
                );

                (extra as any).user = user as any;
              }
            },
          },
          'subscriptions-transport-ws': {
            onConnect: async (connectionParams) => {
              const authToken = connectionParams.authorization;
              const user = await authService.getUserFromToken(authToken);

              return { user };
            },
          },
        },
        context: async ({ req }) => {
          const token = req?.headers?.authorization || '';
          if (token) {
            const user = await authService.getUserFromToken(token);
            return { req, user };
          }
        },
      }),
    }),
  ],
})
export class AppModule {}
