import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    last_name: string;

    @IsString()
    @ApiProperty()
    email: string;

}
