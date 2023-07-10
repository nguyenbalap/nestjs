import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBody, ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { CreatePostDto, UpdatePutDto } from './dto/posts.dto';
import { OwnerGuard } from 'src/guards/owner.guard';

@ApiTags('posts')
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

  @Post(':userId/create')
  @UseGuards(OwnerGuard)
  @ApiBody({ type: CreatePostDto })
  createPost(@Body() posts: CreatePostDto) {
    return this.postsService.create(posts);
  }

  @Put(':userId/update/:id')
  @ApiBody({ type: UpdatePutDto })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'userId' })
  @UseGuards(OwnerGuard)
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePutDto,
  ) {
    return this.postsService.edit(id, data);
  }

  @Delete(':userId/delete/:id')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'userId' })
  @UseGuards(OwnerGuard)
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.destroy(id);
  }
}
