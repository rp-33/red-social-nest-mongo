import { 
    Injectable,
    NotFoundException,
    HttpException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt.payload';
import * as bcrypt from 'bcrypt';
import {
    LoginDto,
    SignupDto,
    UserDto
  } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor( 
        @InjectModel(User.name) private readonly _userModel: Model<UserDocument>,
        private readonly _jwtService: JwtService
    ) {}

    async generateAccessToken(_id: string) : Promise<string> {
        const payload: JwtPayload = { _id : _id };
        return this._jwtService.sign(payload);
    }

    async getUserById(_id: string): Promise<User>{
        const user : User =  await this._userModel.findOne({ _id });

        if(!user) throw new NotFoundException();

        return user;
    }

    async hashPassword(password : string) : Promise<string> {
        const salt : string = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async validatePassword(password : string, hashPassword :  string): Promise<boolean> {
        return await bcrypt.compareSync(password,hashPassword);
    }

    async login(body : LoginDto): Promise<UserDto> {

        const user: User = await this._userModel.findOne({ email : body.email });

        if (!user) throw new NotFoundException('Correo o clave invalida!');

        let validatePass : boolean = await this.validatePassword(body.password,user.password);

        if(!validatePass) throw new NotFoundException('Correo o clave invalida!');

        const token : string = await this.generateAccessToken(user._id);

        return{
            _id : user._id,
            userName : user.userName,
            email : user.email,
            token : token
        }
        
    }

    async signup(body : SignupDto): Promise<UserDto> {

        const userId : User = await this._userModel.findOne({ email : body.email },{_id:true});

        if(userId) throw new HttpException('Ya existe el correo.', 400);

        body.password = await this.hashPassword(body.password);

        const user: User = await this._userModel.create(body);

        if (!user) throw new NotFoundException('No se pudo guardar el usuario.');

        const token:string = await this.generateAccessToken(user._id);

        return{
            _id : user._id,
            userName : user.userName,
            email : user.email,
            token : token
        }
        
    }

}
