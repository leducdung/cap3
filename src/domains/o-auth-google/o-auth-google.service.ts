import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthGoogleService {
  async googleLogin(req) {
    if (!req.user) {
      return await 'No user from google';
    }

    if (req.user) {
      return await {
        message: 'User information from google',
        user: req.user,
      };
    }
  }
}
