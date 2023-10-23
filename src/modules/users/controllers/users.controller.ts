import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { getFormattedDate } from 'olisua-moment-lib';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,  
  ) {}

  @Get('date')
    mydate() {
      return getFormattedDate();
    } 
    @Get()
    findAll() {
      return this.usersService.findAll();
    }

    @Post()
    create(@Body() query: CreateUserDto) {
      return this.usersService.create(query);
    }

    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() data: UpdateUserDto,
    ) {
      return this.usersService.update(id, data);
    }

    @Delete(':id')
    async remove(
      @Param('id') id: number
    ) {
      // console.log( formattedDate );
      return this.usersService.remove(id);
  }
  
}
