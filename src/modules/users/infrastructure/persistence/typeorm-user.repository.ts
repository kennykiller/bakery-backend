import { Inject, Injectable } from "@nestjs/common"
import { UserRepository } from "../../domain/repositories/user.repository"
import { UserOrmEntity } from "./user.orm-entity"
import { DataSource, Repository } from "typeorm"
import { User } from "../../domain/entities/user"
import { UserMapper } from "../mappers/user.mapper"
import { RequiredExcept } from "src/shared/utils/util-types"
import { POSTGRES_SOURCE } from "src/shared/typeorm.providers"

@Injectable()
export class TypeOrmUsersRepository implements UserRepository {
  private readonly repo: Repository<UserOrmEntity>

  constructor(
    @Inject(POSTGRES_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repo = this.dataSource.getRepository(UserOrmEntity)
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log('here', email);

    try {
      const entity = await this.repo.findOneBy({ email });
      console.log(entity, 'entity found');
    
      return entity ? UserMapper.toDomain(entity) : null;
    } catch (error) {
      console.log(error, 'error');

      return null
    }
  }

  async findById(id: string): Promise<User | null> {
      const entity = await this.repo.findOneBy({ id });
      return entity ? UserMapper.toDomain(entity) : null;
  }

  async save(user: User): Promise<User> {
    const result = await this.repo.save(UserMapper.toOrm(user));

    return UserMapper.toDomain(result)
  }

  async create(userPayload: RequiredExcept<User, 'email' | 'passwordHash'>): Promise<User> {
    const result = await this.repo.save(UserMapper.toOrm(userPayload));

    return UserMapper.toDomain(result);
  }
}
