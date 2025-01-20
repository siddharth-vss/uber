import 'express';
import { Captain, User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      captain?:Captain;
    }
  }
}
