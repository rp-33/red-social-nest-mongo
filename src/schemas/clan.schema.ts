import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose'; 
import { User } from './user.schema';

export type ClanDocument = Clan & Document; 

@Schema()
export class Clan {
    @Prop({ default : new Types.ObjectId() }) 
    _id: string;

    @Prop() 
    name: string;

    @Prop()
    description: string;

    @Prop()
    interest: string;

    @Prop()
    type: string;

    @Prop({ type : Types.ObjectId, ref:User }) 
    created_user: string;

    @Prop({ default : new Date() })
    created_at: Date;

    @Prop([Types.ObjectId]) 
    users_join: string[];
}

export const ClanSchema = SchemaFactory.createForClass(Clan); 