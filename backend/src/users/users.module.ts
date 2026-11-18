import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, UserSchemaClass } from "./schemas/user.schema.js";
import { UsersController } from "./users.controller.js";
import { UsersService } from "./users.service.js";
import { USER_REPOSITORY } from "./repositories/users.repository.interface.js";
import { UsersRepository } from "./repositories/users.repository.js";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserSchemaClass.name, schema: UserSchema }]),
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