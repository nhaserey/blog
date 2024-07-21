import { Module } from '@nestjs/common';
import { TypeOrmConfig } from './typeorm/type-orm';

@Module({
  imports: [TypeOrmConfig],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
