import { 
    IsNotEmpty,
    IsString,
    IsEmail,
    Length
} from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
    password : string;
}

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    userName : string;

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    @Length(6, 16)
    password : string;

}

export class UserDto {
    @IsString()
    @IsNotEmpty()
    _id: string;

    @IsString()
    @IsNotEmpty()
    userName : string;

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
    token : string;

}
