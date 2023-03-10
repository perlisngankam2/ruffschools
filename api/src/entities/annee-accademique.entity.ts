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
import { Expense } from './expense.entity';
import { Inscription } from './inscription.entity';
import { Pension } from './pension.entity';

@Entity()
@ObjectType()
export class AnneeAccademique {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  // @Field(() => Date, { nullable: true })
  // @Property({ nullable: true })
  // anneeAccademique!: Date | null;

  @OneToMany(()=> Inscription, (inscription) => inscription.anneeAccademique
  )
  inscription = new Collection<Inscription>(this)

  @OneToMany(()=> Pension, (pension) => pension.anneeAccademique
    )
  pension = new Collection<Pension>(this)

  @OneToMany(()=> Expense, (expense) => expense.anneeAccademique
  )
  expense = new Collection<Expense>(this)
}