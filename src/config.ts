import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { Comment } from './comments/comment.entity';

const type = (process.env.TYPEORM_CONNECTION as any) || 'mysql';

export const databases: TypeOrmModuleOptions = {
  type,
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.PASSWORD || 'rootpassword',
  database: process.env.DB || 'blogs',
  entities: [User, Post, Comment],
  synchronize: true,
  // autoLoadEntities: true
};

export const port = () => parseInt(process.env.PORT, 10);

// console.log([join(__dirname, './**/*.entity{.ts,.js}')])
