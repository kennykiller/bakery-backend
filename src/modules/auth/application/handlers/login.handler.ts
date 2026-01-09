import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { LoginCommand } from '../commands/login.command';
import bcrypt from 'bcrypt';
import { type UserRepository } from 'src/modules/users/domain/repositories/user.repository';
import { USERS_REPO_API } from 'src/modules/users/domain/ports/users-reader.token';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @Inject(USERS_REPO_API)
    private readonly usersApi: UserRepository,
    private readonly jwt: JwtService,
  ) {}

  async execute(cmd: LoginCommand) {
    const user = await this.usersApi.findByEmail(cmd.email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = await bcrypt.compare(cmd.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwt.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}
