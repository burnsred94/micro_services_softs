import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Card } from "./interfaces/card.interface";
import * as mongoose from "mongoose";
import { Keys } from "src/modules/keys/schemas/keys.schema";


export type GeneratorDataDocument = mongoose.HydratedDocument<GeneratorData>

@Schema()
export class GeneratorData {

    @Prop({ type: Number, required: true })
    article: number;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "GeneratorData" }])
    data_generation: Keys[][];

    @Prop({ type: Number })
    instance: number;

    @Prop({ type: Object })
    product: Card

}


export const GeneratorDataSchema = SchemaFactory.createForClass(GeneratorData);
