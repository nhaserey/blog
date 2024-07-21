import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DBFile } from './entities/dbfile.entity';
import { Category } from './entities/category.entity';
import { User } from '../user/entities/user.entity';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Category, DBFile]),
    AuthModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [],
})
export class PostModule {}
