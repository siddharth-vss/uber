import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async isTokenBlacklisted(token: string) {
    const blacklistedToken = await this.prisma.blacklistToken.findUnique({
      where: { token : token }
    });
    return blacklistedToken;
  }

  async blacklistToken(token: string) {
    const Addtoken = await this.prisma.blacklistToken.create({
      data: {
        token: token,
      },
    });
    return Addtoken;
  }
}
