import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../type/user.type';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;
  
  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: [1, 2] })
  role: UserRole;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isActive: boolean;
}
