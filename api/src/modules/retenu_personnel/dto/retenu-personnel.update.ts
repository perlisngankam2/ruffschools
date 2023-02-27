/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { PersonnelCreateInput } from 'src/modules/personnel/dto/personnel.input';
import { RetenuCreateInput } from 'src/modules/retenu_salarial/dto/retenu.input';

@InputType()
export class RetenuPersonnelUpdateInput {
  @Field(()=>ID,{nullable:true})
  retenuId?: string;

  @Field(()=>ID,{nullable:true})
  personnelId?:string

  @Field()
  retenu?:RetenuCreateInput;

  @Field()
  personnnel?:PersonnelCreateInput
}
