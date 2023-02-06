/* eslint-disable prettier/prettier */
import { EntityManager, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import * as bcript from 'bcrypt';
import { UserCreateInput } from './dto/user.input';
import { UpdateUserInput } from './dto/user.update';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async create(
    input: UserCreateInput,
  ): Promise<User> {
    const new_user = new User()
    new_user.name = input.name
    new_user.email = input.email
    new_user.role = input.role
    new_user.lastName = input.lastName
    new_user.password = input.password
    new_user.firstName = input.firstName
    new_user.phoneNumber = input.phoneNumber

    await this.userRepository.persistAndFlush(new_user)
    return new_user
  }

  findByOne(filters: FilterQuery<User>): Promise<User | null> {
    return this.userRepository.findOne(filters);
  }

  findById(id:string){
    return this.userRepository.findOne(id)
  }

  getAll(): Promise<User[]> {
    return this.userRepository.findAll()
  }
  
  async update(id:string, input: UpdateUserInput): Promise<User> {
    const user=await this.findById(id)
    const { password, ...inputWithoutPassword } = input;

    if (password) {
        user.password = await bcript.hash(password,10)
    }
    const firstName =
      input.firstName && input.firstName.trim() !== ''
        ? input.firstName
        : user.firstName;
    const lastName =
      input.lastName && input.lastName.trim() !== ''
        ? input.lastName
        : user.lastName;

    wrap(user).assign({
      firstName,
      lastName,
      phoneNumber: inputWithoutPassword.phoneNumber || user.phoneNumber,
    });

    await this.userRepository.persistAndFlush(user);

    return user;
  }

  async delete(id:string){
    const a= this.findById(id)
    await this.userRepository.removeAndFlush(a)
    if(!a){
    throw Error("not found")
    }
    return a


  }

}