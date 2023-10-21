import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,  
  ) {}

    @Post()
    create(@Body() query: CreateUserDto) {
      return this.usersService.create(query);
    }
  
    @Get()
    findAll() {
      return this.usersService.findAll();
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
      return this.usersService.remove(id);
  }
  
}
