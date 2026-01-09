import { Module } from "@nestjs/common";
import { TypeOrmUsersRepository } from "./infrastructure/persistence/typeorm-user.repository";
import { USERS_REPO_API } from "./domain/ports/users-reader.token";
import { TypeOrmCustomModule } from "src/shared/typeorm.module";

@Module({
    imports: [TypeOrmCustomModule],
    providers: [
        {
            provide: USERS_REPO_API,
            useClass: TypeOrmUsersRepository
        }
    ],
    exports: [USERS_REPO_API]
})
export class UsersModule {}