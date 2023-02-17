import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/types/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() request: CreateUserDto): Promise<any> {
    return this.userService.create(request);
  }

  @Get()
  async find(@Query('role') role: string): Promise<any> {
    return this.userService.find(role);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateUserDto,
    @Param() id: string,
  ): Promise<any> {
    return this.userService.update(id, request);
  }

  @Delete(':id')
  async delete(@Param() id: string): Promise<any> {
    return this.userService.delete(id);
  }
}
