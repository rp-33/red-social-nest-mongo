import { 
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Clan, ClanDocument } from '../../schemas/clan.schema';
import { Model } from 'mongoose';

@Injectable()
export class ClanService {
    constructor( 
        @InjectModel(Clan.name) private readonly _clanModel: Model<ClanDocument>
    ) {}

    async findMe(query) : Promise<Clan[]> {

        const clan : Clan[] = await this._clanModel.find({users_join : query.user});

        return clan;
    }
    
    async findOne(params) : Promise<Clan> {

        const clan : Clan = await this._clanModel.findOne({_id : params._id});

        return clan;
    }
    
    async findAll(query) : Promise<Clan[]> {

        const clan : Clan[] = await this._clanModel.find({name : query.name});

        return clan;
    }

    async create(body) : Promise<Clan> {

        const clan : Clan = await this._clanModel.create(body);

        if(!clan._id) throw new NotFoundException('Error al crear tu clan');

        return clan;
    }

    async update(body) : Promise<string> {

        let {_id,...clan}  = body;

        const updateResult : any = await this._clanModel.updateOne({_id},{$set:clan});

        if(updateResult.nModified===0) throw new NotFoundException('No se actualizo su clan');

        return 'Se actualizo su clan';
    }

    async delete(params) : Promise<string> {

        const deleteResult : any = await this._clanModel.deleteOne({_id : params._id});

        if(deleteResult.deletedCount===0) throw new NotFoundException('No se elimino su clan');

        return 'Se elimino su clan';
    }


}
