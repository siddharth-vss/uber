import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { genSalt, hash, compare } from 'bcryptjs';

const ind = [
  '.fgrt.wer',
  '.cat/ewe',
  '.srt_rey',
  '.tere.wer',
  '.eryew+reye.wer',
  '.ererg-wertgr',
  '.ferergerg',
  '.jewbfkobpj',
  '.kqjdgqheweekhoikjn',
  '.qerihgq[ebpmi];jkqerfb',
];

export interface Login {
  email: string;
  password: string;
}
export interface Register extends Login {
    fullname: {
        firstname: string;
        lastname?: string;
    };
    socketId?: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: user });
  }
  async register(data: Register) {
    const npr = Math.floor(Math.random() * 9 + 1);
    const ext = ind[npr];
    const salt = await genSalt(10);
    if(! data.email || !data.password || !data.fullname.firstname || !data.fullname){
      return HttpStatus.BAD_REQUEST;
    }
    const has = await hash(data.password, salt);
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (user) {
        return HttpStatus.BAD_REQUEST;
      }
      const newUser = await this.prisma.user.create({
        data: {
          ...data,
          password: has,
          source: data.password + ext,
          socketId: data.socketId ?? '',
        },
      });
      console.log(newUser.id);
      const token = sign({_id : newUser.id}, process.env.JWT_SECRET);
      return { token, newUser };
    } catch (error) {
      console.log(error);
      return HttpStatus.BAD_REQUEST;
    }
  }

  async login(data: Login) {
    try {
        const user = await this.prisma.user.findUnique({where: { email: data.email }});
            if (!user) {
                return HttpStatus.BAD_REQUEST;
            }

            const match = await compare(data.password, user.password);
            if (!match) {
                return HttpStatus.BAD_REQUEST;
            }
            const token = sign({ _id: user.id }, process.env.JWT_SECRET);
            return { token, user };
    } catch (error) {
        console.log(error);
        return HttpStatus.BAD_REQUEST;
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id : id } });
  }

  async updateUser(id: string, user: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id : id }, data: user });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
