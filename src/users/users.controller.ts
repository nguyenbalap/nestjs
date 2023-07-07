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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  getAll() {
    return this.usersService.getAll();
  }

  @Post('/create')
  @HttpCode(200)
  @ApiBody({ type: CreateUserDto })
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
}
