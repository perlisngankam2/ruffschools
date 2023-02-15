/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { RegimePaiement } from 'src/entities/tranche-student.entity';
import { StudentCreateInput } from 'src/modules/student/dto/student.input';
import { TrancheStudentCreateInput } from 'src/modules/tranche-student/dto/tranche-student.input';
import { TrancheCreateInput } from 'src/modules/tranche/dto/tranche.input';

@InputType()
export class AvanceTrancheCreateInput {
  @Field({nullable:true})
  ID?: string;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field({defaultValue:0})
  reste?: number;

  @Field()
  student?:StudentCreateInput
  
  @Field()
  tranche?:TrancheStudentCreateInput
}
