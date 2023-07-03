import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async signIn(email: string, pass: string): Promise<any> {
      const user = await this.usersService.findOneByEmail(email);
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const { password, ...result } = user;
      return { access_token: await this.jwtService.signAsync({ ...result }) };
    }
}
