import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
@Entity({ name: 'Thumnail' })
export class DBFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '', nullable: false })
  url: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Post, (post) => post.thumnail)
  post: Post;
}
