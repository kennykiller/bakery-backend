import { Body, Controller, Post, Req } from '@nestjs/common';
import { RegisterDto } from '../../application/dto/register.dto';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterCommand } from '../../application/commands/register.command';
import { LoginDto } from '../../application/dto/login.dto';
import { LoginCommand } from '../../application/commands/login.command';
import { type IRequest } from 'src/shared/interfaces/request-extended.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.commandBus.execute(new RegisterCommand(dto.email, dto.password));
  }

  @Post('login')
  login(@Body() dto: LoginDto, @Req() request: IRequest) {
    console.log(request.clientId, 'client id');
    console.log(dto, 'dto');

    return this.commandBus.execute(new LoginCommand(dto.email, dto.password, request.clientId));
  }
}
