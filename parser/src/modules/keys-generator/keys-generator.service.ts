import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { readFileSync } from 'fs';
import { Model } from 'mongoose';
import { parse } from 'papaparse';

@Injectable()
export class KeysGeneratorService {

    async generatorKeys(text: string) {
        const record = [];
        const keys = []
        const data = readFileSync('storage/data.csv');
        const csvData = data.toString();

        const dataParse = await parse(csvData, {
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => results.data
        })



        dataParse.data.map((value) => {
            record.push({ key: value[0], count: value[1] })
        })

        record.map((value) => {
            try {
                if (typeof value.key === 'string') {
                    value.key.split(' ').forEach((i: string) => {
                        text.split(' ').forEach((j: string) => {
                            if (j.indexOf(i) !== -1 && i.length > 3 || j.toLowerCase() === i.toLowerCase()) {
                                keys.push(value)
                            }

                        })
                    })
                }
            } catch (err) {

            }
        })

        return keys
    }

}
