/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { CategorieRetenuCreateInput } from 'src/modules/categorie_retenu/dto/categorie-retenu.input';

@InputType()
export class RedutionScolariteInput {
  @Field({nullable:true})
  ID!: string;

  @Field({nullable:true})
  name!: string;

  @Field({nullable:true})
  description!: string;

  @Field({nullable:true,defaultValue:0})
  montant!: number;

  @Field({nullable:true, defaultValue:0})
  pourcentage!: number;
}
