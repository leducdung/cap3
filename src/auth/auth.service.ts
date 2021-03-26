import { Injectable } from '@nestjs/common';
import { UsersService } from '../domains/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({
      data: {
        userName,
      },
    });

    if (!user) {
      return { message: 'Username not found' };
    }
    const isMatch = await bcrypt.compare(pass, user.passWord);

    if (!isMatch) {
      return { message: 'Incorrect password' };
    }

    const { passWord, ...result } = user;
    return result;
  }

  async login(createUserDto: any) {
    const result = await this.validateUser(
      createUserDto.userName,
      createUserDto.passWord,
    );
    if (result.message) {
      return result;
    }

    const payload = { userName: createUserDto.userName, result: result._doc };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginGoogle(googleID: any) {
    const user = await this.usersService.findOne({
      data: {
        googleID,
      },
    });

    if (!user) {
      return { message: 'google account not found' };
    }

    const payload = { googleID, result: user };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
