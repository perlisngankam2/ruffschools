/* eslint-disable prettier/prettier */
import {
    Collection,
    Entity,
    Enum,
    Filter,
    IdentifiedReference,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
    Unique,
  } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../decorators/PrimaryKeyUuid.decorator';
import { Retenue } from './retenu-salaire.entity';

// definir enumeration taux, cotisation ect....
export enum TypeRetenu {
  TAXES = 'TAXES',
  COTISATIONS = 'COTISATIONS',
  AUTRES = 'AUTRES'
}
@Entity()
@ObjectType()
export class CategorieRetenu {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  nom!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  @Enum({     
    items: () => TypeRetenu,
    default: TypeRetenu.AUTRES  
  })
  type!: TypeRetenu;

  // relation with another Entites
  @OneToMany(() => Retenue, retenu => retenu.categorieRetenu)
  retenu = new Collection<Retenue>(this);
  
}