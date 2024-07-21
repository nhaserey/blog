import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/module/post/entities/category.entity';
import { DBFile } from 'src/module/post/entities/dbfile.entity';
import { Post } from 'src/module/post/entities/post.entity';
import { User } from 'src/module/user/entities/user.entity';

export const TypeOrmConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_NAME'),
    entities: [Post, User, Category, DBFile],
    synchronize: true,
  }),
  inject: [ConfigService],
});
