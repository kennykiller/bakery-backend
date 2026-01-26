import { RequiredExcept } from 'src/shared/utils/util-types';
import { User } from '../../domain/entities/user';
import { UserOrmEntity } from '../persistence/user.orm-entity';
import { UserRole } from '../../domain/value-objects/user-role';

export class UserMapper {
  static toDomain(entity: UserOrmEntity): User {
    return new User(
      entity.id as string,
      entity.email,
      entity.passwordHash,
      entity.role as UserRole,
      entity.isActive as boolean,
    );
  }

  static toOrm(user: RequiredExcept<User, 'email' | 'passwordHash'>): UserOrmEntity {
    const entity = new UserOrmEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.passwordHash = user.passwordHash;
    entity.role = user.role;
    entity.isActive = user.isActive;
    return entity;
  }
}
