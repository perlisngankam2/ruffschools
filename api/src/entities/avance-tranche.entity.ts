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
import { Personnel } from './pesonnel.entity';
import { TrancheStudent } from './tranche-student.entity';
import { Tranche } from './tranche.entity';

@Entity()
@ObjectType()
export class AvanceTranche {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  dateLine!: Date | null;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  montant!: number;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  reste!: number;

  @Field({ defaultValue: false })
  @Property({default:false})
  complete!: boolean;

  @ManyToOne(() => TrancheStudent ,{
    nullable:false,
    onDelete:'CASCADE',
  })
  trancheStudent!:IdentifiedReference<TrancheStudent>|null

  @ManyToOne(() => Tranche ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  tranche!:IdentifiedReference<TrancheStudent>|null
}