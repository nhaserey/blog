import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ThumnailDto } from './dto/dbfile.dto';
import LocalFileInterceptor from '../../core/intercepter/localFile.interceptor';

@ApiTags('Post Route')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/:id/posts')
  async createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.postService.createPost(id, createPostDto);
  }

  @Post('/:userId/posts/:postId/category')
  async createPostCategory(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return await this.postService.createCategoryToPost(
      userId,
      postId,
      createCategoryDto,
    );
  }

  @Post('/:userId/posts/:postId/thumbnail')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(
    LocalFileInterceptor({
      fieldName: 'file',
      path: '/image',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 4), // 1 GB limit
      },
    }),
  )
  async createThumbnailForPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() thumbnailDto: ThumnailDto,
  ) {
    return await this.postService.createThumbnailForPost(
      userId,
      postId,
      thumbnailDto,
    );
  }
}
