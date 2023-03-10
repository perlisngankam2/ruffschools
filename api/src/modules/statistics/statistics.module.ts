/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { ExpenseModule } from "../expenses/expense.module";
import { InscriptionModule } from "../inscription/inscription.module";
import { SalleModule } from "../salle/salle.module";
import { TrancheStudentModule } from "../tranche-student/tranche-student.module";
import { StatisticResolver } from "./statistics.resolver";
import { StatisticService } from "./statistics.service";


@Module({
    imports:[
        InscriptionModule,
        TrancheStudentModule,
        SalleModule,
        ExpenseModule
    ],
    providers:[StatisticService,StatisticResolver],
    exports:[StatisticService]
})
export class StatisticModule {}
