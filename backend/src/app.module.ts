import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js'
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>({
        uri: configService.get<string>('MONGO_URI')
      })
    }),
    AuthModule,
    UsersModule,
  ],

  controllers: [
    AppController, //pode ser removido mas vou deixar por enquanto
  ], 
  providers: [
    AppService, //pode ser removido mas vou deixar por enquanto
  ], 
})
export class AppModule {}
