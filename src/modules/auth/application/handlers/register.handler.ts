import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from '../commands/register.command';
import { BadRequestException, Inject } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { USERS_REPO_API } from 'src/modules/users/domain/ports/users-reader.token';
import { type UserRepository } from 'src/modules/users/domain/repositories/user.repository';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(USERS_REPO_API)
    private readonly usersApi: UserRepository
  ) {}

  async execute(cmd: RegisterCommand) {
    console.log(cmd, 'command');
    
    const exists = await this.usersApi.findByEmail(cmd.email);
    if (exists) {
      throw new BadRequestException('User already exists');
    }

    const passwordHash = await bcrypt.hash(cmd.password, 10);

    const user = await this.usersApi.create({ email: cmd.email, passwordHash });

    return { id: user.id, email: user.email };
  }
}
