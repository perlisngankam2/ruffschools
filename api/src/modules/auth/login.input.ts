/* eslint-disable prettier/prettier */
import { Field, InputType} from "@nestjs/graphql";

@InputType()
export class LoginInput{
    @Field()
    username:string

    @Field()
    password: string

    @Field({ defaultValue: false}) 
    connection: boolean

}

