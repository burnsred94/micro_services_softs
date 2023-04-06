import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { KeysGeneratorModule } from './modules/keys-generator/keys-generator.module';
import { SearchModule } from './modules/search/search.module';
import { GotModule } from '@t00nday/nestjs-got';
import { GeneratorDataModule } from './modules/generator-data/generator-data.module';
import { GetProductServiceService } from './modules/get-product-service/get-product-service.service';
import { GetProductServiceModule } from './modules/get-product-service/get-product-service.module';
import { EventsModule } from './modules/events/events.module';
import { KeysModule } from './modules/keys/keys.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './parser-wb/.env'
  }),
    DatabaseModule,
    KeysGeneratorModule,
    SearchModule,
    GotModule,
    GetProductServiceModule,
    GeneratorDataModule,
    EventsModule,
    KeysModule
  ],
  controllers: [AppController],
  providers: [AppService, GetProductServiceService],
})
export class AppModule { }
