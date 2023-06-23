import {
  Controller,
  Get,
  Res,
  Req,
  HttpCode,
  Header,
  Redirect,
  Param,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInterFace } from './interfaces/user.interface';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Post()
  @HttpCode(204)
  create(@Body() user: UserInterFace): Promise<User> {
    return this.usersService.create(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
}
