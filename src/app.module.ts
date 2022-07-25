import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ClanModule } from './modules/clan/clan.module';
import { PublicationModule } from './modules/publication/publication.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    ClanModule,
    PublicationModule,
    UserModule,
  ]
})

export class AppModule {
  static port : number | string;
  constructor(){
    AppModule.port = process.env.PORT || 8088;
  }
}
