import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose'; 

export type UserDocument = User & Document; 

@Schema()
export class User {
    @Prop({ default : new Types.ObjectId() }) 
    _id: string;

    @Prop() 
    userName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default : new Date() })
    created_at: Date;

}

export const UserSchema = SchemaFactory.createForClass(User); 