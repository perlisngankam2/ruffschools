/* eslint-disable prettier/prettier */
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, forwardRef } from '@nestjs/common';
import { Pension } from 'src/entities/pension.entity';
import { AnneAccademiqueModule } from '../anne_accademique/anne_accademique.module';
import { PensionResolver } from './pension.resolver';
import { PensionService } from './pension.service';
import { TrancheStudentModule } from '../tranche-student/tranche-student.module';
import { StudentModule } from '../student/student.module';
import { ExpenseModule } from '../expenses/expense.module';
import { ParamaterModule } from '../parameter/parameter.module';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Pension] }),
        forwardRef(()=>TrancheStudentModule),
        forwardRef(() =>StudentModule),
        forwardRef(()=>ExpenseModule), 
        ParamaterModule
        
    ],
    providers:[PensionService,PensionResolver],
    exports:[PensionService]
})
export class PensionModule {}
