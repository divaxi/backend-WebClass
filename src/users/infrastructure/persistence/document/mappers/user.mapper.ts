import { User } from '../../../../domain/user';
import { UserSchemaClass } from '../entities/user.schema';
import { Role } from '../../../../../roles/domain/role';
import { RoleSchema } from '../../../../../roles/infrastructure/persistence/document/entities/role.schema';

export class UserMapper {
  static toDomain(raw: UserSchemaClass): User {
    const domainEntity = new User();
    domainEntity.id = raw._id.toString();
    domainEntity.email = raw.email;
    domainEntity.password = raw.password;
    domainEntity.firstName = raw.firstName;
    domainEntity.lastName = raw.lastName;

    if (raw.role) {
      domainEntity.role = new Role();
      domainEntity.role.name = raw.role.name;
    }

    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserSchemaClass {
    let role: RoleSchema | undefined = undefined;

    if (domainEntity.role) {
      role = new RoleSchema();
      role.name = domainEntity.role.name;
    }

    const persistenceSchema = new UserSchemaClass();
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.email = domainEntity.email;
    persistenceSchema.password = domainEntity.password;
    persistenceSchema.firstName = domainEntity.firstName;
    persistenceSchema.lastName = domainEntity.lastName;
    persistenceSchema.role = role;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.deletedAt = domainEntity.deletedAt;
    return persistenceSchema;
  }
}
