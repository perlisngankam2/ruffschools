/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { AnneeAccademiqueCreateInput } from 'src/modules/anne_accademique/dto/anne-accademique.update';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { NiveauEtudeCreateInput } from 'src/modules/niveau_etude/dto/niveau-etude.input';
import { SalleCreateInput } from 'src/modules/salle/dto/salle.input';

@InputType()
export class PensionUpdateInput {
  @Field(()=>ID,{nullable:true})
  salle_id?:string

  @Field(()=>ID,{nullable:true})
  anneeAcademique_id?:string

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field(()=>ID,{nullable:true})
  dateLine?: Date;

  @Field(()=>SalleCreateInput,{nullable:true})
  salle?:SalleCreateInput

  @Field(()=>AnneeAccademiqueCreateInput,{nullable:true})
  anneeAccademique?:AnneeAccademiqueCreateInput
}
