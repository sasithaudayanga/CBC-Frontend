

import { createClient } from "@supabase/supabase-js"
import { Toaster } from "react-hot-toast"

    
    
    const url=import.meta.env.VITE_SUPABASE_URL
    const key=import.meta.env.VITE_SUPABASE_KEY
    const supabase=createClient(url,key)

    export default function mediaUpload(file){

        const mediaUploadPromise=new Promise(
            (resolve,reject)=>{
                if(file==null){
                    reject ("No File Selected")
                    return 
                }

                const timeStamp=new Date().getTime()
                const newName=timeStamp+file.name
                
                supabase.storage.from("images").upload(newName,file,{
                    upsert:false,
                    cacheControl:"3600"
                }).then(()=>{
                    const puburl=supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
                    resolve(puburl)
        
                }).catch((e)=>{
                    reject(e)
                })

            }
        )

        return mediaUploadPromise

    }
