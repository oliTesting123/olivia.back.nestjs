import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { Users } from '../../../database/entities/users.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    ) { }

    async findAll(take: number = 1000): Promise<Users[]> {
        return this.usersRepository.find({
            take,
            order: { id: 'ASC' }
        });
    }

    async create(data: CreateUserDto): Promise<Users> {
        
        try {
          return await this.usersRepository.save(data);
        } catch (error) {
          if (error.code === '23505') {
            throw new BadRequestException('User to user already exists.');
          }
    
          throw error;
        }
    }

    async update(id: number, data: CreateUserDto): Promise<Users> {
        const user = await this.usersRepository.findOneBy({ id });
    
        if (!user) {
          throw new NotFoundException('User not found.');
        }
    
        try {
          return await this.usersRepository.save(
            this.usersRepository.merge(user, data)
          );
        } catch (error) {
          if (error.code === '23505') {
            throw new BadRequestException('User to update balance data.');
          }
    
          throw error;
        }
      }

      async remove(id: number): Promise<any> {
        const user = await this.findOne(id);
    
        return await this.usersRepository.softDelete({ id });
      }

      async findOne(id: number): Promise<Users> {
        const user = await this.usersRepository.findOneBy({ id });
    
        if (!user) {
          throw new NotFoundException('User balance not found');
        }
    
        return user;
      }
    
}
