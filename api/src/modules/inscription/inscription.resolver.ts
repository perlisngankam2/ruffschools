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
import { Inscription } from 'src/entities/inscription.entity';
import { Student } from 'src/entities/student.entity';
import { InscriptionUpdateInput } from './dto/incription.update';
import { InscriptionInput } from './dto/inscription.input';
import { InscriptionService } from './inscription.service';


@Resolver(() => Inscription)
export class InscriptionResolver {
  constructor(private readonly inscriptionService: InscriptionService) {}

  @Mutation(() => Inscription)
  createInscription(@Args('inscription') Input: InscriptionInput) {
    return this.inscriptionService.create(Input);
  }

  @Mutation(() => Inscription)
  update(@Args('inscription') Input: InscriptionInput, @Args('id')  id: string) {
    return this.inscriptionService.update(id,Input);
  }

  @Query(() => [Inscription])
  findAll() {
    return this.inscriptionService.getAll()
  }
  
  @Query(() => Inscription)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.inscriptionService.findByOne(id);
  }

}


