import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';
import { DBFile } from './entities/dbfile.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ThumnailDto } from './dto/dbfile.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(DBFile)
    private readonly thumbnailRepository: Repository<DBFile>,
  ) {}

  async createPost(userId: number, createPostDto: CreatePostDto) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    const newPost = this.postRepository.create({
      ...createPostDto,
      user,
    });

    return await this.postRepository.save(newPost);
  }

  async createCategoryToPost(
    userId: number,
    postId: number,
    createCategoryDto: CreateCategoryDto,
  ) {
    const post = await this.postRepository.findOne({
      where: { id: postId, user: { id: userId } },
    });

    if (!post) {
      throw new BadRequestException('Post Not Found');
    }

    const newCategory = this.categoryRepository.create({
      ...createCategoryDto,
      post,
    });

    return await this.categoryRepository.save(newCategory);
  }

  async createThumbnailForPost(
    userId: number,
    postId: number,
    thumbnailDto: ThumnailDto,
  ) {
    const post = await this.postRepository.findOne({
      where: { id: postId, user: { id: userId } },
    });

    if (!post) {
      throw new BadRequestException('Post Not Found');
    }

    const newThumbnail = this.thumbnailRepository.create({
      ...thumbnailDto,
      post,
    });

    return await this.thumbnailRepository.save(newThumbnail);
  }
}
