//GET
import { connectionDB } from "@utils/db"
import Prompt from "@models/prompt";

export const GET = async (request, {params})=>{
    try {
        await connectionDB()
        const prompts = await Prompt.findById(params.id).populate('creator')
        if(!prompts){
            return new Response('prompts not found',{
                status:404
            })
        }else{
            return new Response(JSON.stringify(prompts),{
                status:200
            })
        }
       
    }catch(err){
        return new Response('fail to fetch prompts',{
            status:200
        })
    }
}


// PATCH
export const PATCH = async (request, {params})=>{
    const {prompt, tag} = await request.json()
    try {
        await connectionDB()
        const existingPrompts = await Prompt.findById(params.id)
        if(!existingPrompts){
            return new Response('prompts not found',{
                status:404
            })
        }else{
           
            const newPrompts = await Prompt.findByIdAndUpdate(params.id, {
                prompt:prompt,
                tag:tag
            })
           return new Response(JSON.stringify(newPrompts),{
            status:200
        })
        }
       
    }catch(err){
        return new Response('fail to update prompt',{
            status:500
        })
    }

}


//DELETE
export const DELETE = async (request, {params}) =>{
    try{
        await connectionDB()
        await Prompt.findByIdAndRemove(params.id)

        return new Response('prompt deleted successfully',{
            status:200
        })

    }catch(err){
        return new Response('fail to delete prompt',{
            status:500
        })
    }
}