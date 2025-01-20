import { NestMiddleware, Injectable } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/user/user.service';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthUser implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log(`Middleware triggered: ${req.method} ${req.path}`);

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const isBlacklisted = await this.authService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    try {
      const decoded: any = verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded._id) {
        throw new Error('Invalid token');
      }
      const user = await this.userService.getUserById(decoded._id);
      if (!user) {
        throw new Error('User not found');
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}

@Injectable()
export class AuthCaptain implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log(`Middleware triggered: ${req.method} ${req.path}`);

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const isBlacklisted = await this.authService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    try {
      const decoded: any = verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded._id) {
        throw new Error('Invalid token');
      }
      const user = await this.userService.getUserById(decoded._id);
      if (!user) {
        throw new Error('User not found');
      }
      req.user = user;
      console.log(req.user, 'User');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
