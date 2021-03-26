import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { OAuthGoogleService } from './o-auth-google.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthService } from '../../auth/auth.service';
import { EmployeesService } from '../employees/employees.service';
import { StoreOwnersService } from '../storeOwners/storeOwners.service';

@Controller('google')
export class OAuthGoogleController {
  constructor(
    private readonly oAuthGoogleService: OAuthGoogleService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly employeesService: EmployeesService,
    private readonly storeOwnersService: StoreOwnersService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const profile: any = await this.oAuthGoogleService.googleLogin(req);

    const user = await this.usersService.findOne({
      data: {
        googleID: profile?.user?.googleID,
      },
    });

    if (!user) {
      const storeOwner = await this.storeOwnersService.createOne({
        data: {
          fullName: profile?.user?.firstName.concat(
            ' ' + profile?.user?.lastName,
          ),
        },
      });

      await this.usersService.createOne({
        data: {
          googleID: profile?.user?.googleID,
          email: profile?.user?.email,
          profilePicture: profile?.user?.picture,
          fullName: profile?.user?.firstName.concat(
            ' ' + profile?.user?.lastName,
          ),
          storeOwnerID: storeOwner._id,
        },
      });
    }

    const token = await this.authService.loginGoogle(profile?.user?.googleID);

    return token;
  }
}
