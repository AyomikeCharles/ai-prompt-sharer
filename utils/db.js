import mongoose from "mongoose"

let isConnected = false // track connection

export const connectionDB = async () =>{
    mongoose.set('strictQuery', true)
    if(isConnected){
        console.log('mongodb is connected')
        return
    }

   
    try{

        await mongoose.connect(process.env.ATLAS_URI, {
            dbName:'AiPrompts',
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        isConnected = true
        console.log('mongodb is connected')
    }catch(err){
        console.log(err)
    }
}