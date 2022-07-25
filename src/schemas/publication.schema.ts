import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose'; 
import { User } from './user.schema';
import { Clan } from './clan.schema';

export type PublicationDocument = Publication & Document; 

@Schema()
export class Publication {
    @Prop({ default : new Types.ObjectId() }) 
    _id: string;

    @Prop() 
    text: string;

    @Prop([String]) 
    images: string[];

    @Prop({ type : Types.ObjectId, ref:User }) 
    created_user: string;

    @Prop({ default : new Date() })
    created_at: Date;

    @Prop({ type : Types.ObjectId, ref:Clan })
    clan: string;

}

export const PublicationSchema = SchemaFactory.createForClass(Publication); 