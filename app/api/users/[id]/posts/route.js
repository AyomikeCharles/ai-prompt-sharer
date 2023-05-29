import { connectionDB } from "@utils/db"
import Prompt from "@models/prompt";

export const GET = async (request, {params})=>{
    try {
        await connectionDB()
        const prompts = await Prompt.find({
            creator:params.id
        }).populate('creator')
        return new Response(JSON.stringify(prompts),{
            status:200
        })
    }catch(err){
        console.log(err)
    }
}