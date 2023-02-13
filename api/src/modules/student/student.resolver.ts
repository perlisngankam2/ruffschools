/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Student } from 'src/entities/student.entity';
import { StudentCreateInput } from './dto/student.input';
import { StudentUpdateInput } from './dto/student.update';
import { StudentService } from './student.service';


@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  createStudent(@Args('student') Input: StudentCreateInput) {
    return this.studentService.create(Input);
  }

  @Mutation(() => Student)
  async updateStudent(
    @Args('id') id:string,
    @Args('input') input: StudentUpdateInput,

    ) {
    return this.studentService.update(id,input);
  }

  @Query(() => [Student])
  findAllstudents() {
    return this.studentService.getAll()
  }
  
  @Query(() => Student, { name: 'student' })
  findOnestudent(@Args('id', { type: () => String }) id: string) {
    return this.studentService.findByOne(id);
  }

  @Mutation(()=> Student)
  async deletestudent(@Args('id') id:string){
 return await this.studentService.delete(id)
  }
}
