import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePostDto, UpdatePutDto } from './dto/posts.dto';

@Controller('posts')
@ApiBearerAuth('access-token')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('')
  getPosts() {
    return this.postsService.getAll();
  }

  @Get(':id')
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getById(id);
  }

  @Post('/create')
  @ApiBody({ type: CreatePostDto })
  createPost(@Body() posts: CreatePostDto) {
    return this.postsService.create(posts);
  }

  @Put('/update/:id')
  @ApiBody({ type: UpdatePutDto })
  updatePost(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePutDto) {
    return this.postsService.edit(id, data);
  }

  @Delete('/delete/:id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.destroy(id);
  }
}
