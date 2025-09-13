import mongoose,{Schema, Document} from "mongoose";

//Interface para o livro
 export interface ILivro extends Document{
    titulo: string;
    autor: string;
    ano:number;
    }

    //Schema do livro

    const livroSchema: Schema = new Schema({
      titulo: {type: String, required :true},
      autor:{ type: String, required: true},
      ano:{ type: Number, required: true}  
    });

    //Exportar o modelo

    export default mongoose.model<ILivro>('Livro', livroSchema);