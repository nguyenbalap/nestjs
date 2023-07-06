import { Controller, Get, Res, Req, Query, HttpCode, Header, Redirect, Param } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('api')
export class AppController {
  
  @Get('/health-check')
  getApi(@Res() res: Response) {
    res.status(200).send('ok')
    // return 'ok';
  }

  @Get('/test')
  @HttpCode(204)
  @Header("X-Authorization", 'Authorization')
  @Redirect('https://nestjs.com', 301)
  test(@Req() req: Request): string {
    console.log(req.query);
    return 'test';
  }

  @Get(':id')
  test2(@Param() params: any, @Query('q') q): string {
    console.log(q);
    console.log(params);
    return 'test';
  }
}
