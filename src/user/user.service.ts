import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { CreateUserDto, UpdateUserDto } from 'src/types/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectQueue('createUserQ') private createUserQueue: Queue,
  ) {}

  async delete(id: string): Promise<any> {
    return this.userModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
  async update(id: string, request: UpdateUserDto): Promise<any> {
    return this.userModel.updateOne({ _id: new Types.ObjectId(id) }, request, {
      upsert: true,
    });
  }
  async find(roleFilter: string): Promise<User[]> {
    const filter = roleFilter ? { roles: roleFilter } : {};
    return this.userModel.find(filter).exec();
  }
  async create(request: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(request);
    const result: User = await createdUser.save();
    await this.createUserQueue.add(result);
    return result;
  }
}
