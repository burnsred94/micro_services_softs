import { Module } from '@nestjs/common';
import { GotModule } from '@t00nday/nestjs-got';
import { KeysGeneratorModule } from 'src/modules/keys-generator/keys-generator.module';
import { SearchService } from './search.service';

@Module({
    imports: [KeysGeneratorModule, GotModule],
    providers: [SearchService],
    exports: [SearchService]
})
export class SearchModule { }
