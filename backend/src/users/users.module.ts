import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, UserSchema } from "./models/user.model.js";
import { UsersController } from "./users.controller.js";
import { UsersService } from "./users.service.js";
import { USER_REPOSITORY } from "./repositories/users.repository.interface.js";
import { UsersRepository } from "./repositories/users.repository.js";
import { AuthModule } from "../auth/auth.module.js";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USER_REPOSITORY,
      useClass: UsersRepository
    }
  ],
  exports: [UsersService, USER_REPOSITORY]
})

export class UsersModule {}