import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    userId: number;
}

export class UpdatePutDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;
}
