import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Card } from "./interfaces/card.interface";
import * as mongoose from "mongoose";
import { Data } from "./interfaces/data_generations";



export type GeneratorDataDocument = mongoose.HydratedDocument<GeneratorData>

@Schema()
export class GeneratorData {

    @Prop({ type: Number, required: true })
    article: number;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Keys" }])
    data_generation: Data[];

    @Prop({ type: Number })
    instance: number;

    @Prop({ type: Object })
    product: Card

}


export const GeneratorDataSchema = SchemaFactory.createForClass(GeneratorData);
