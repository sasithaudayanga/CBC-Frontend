

import { createClient } from "@supabase/supabase-js"
import { Toaster } from "react-hot-toast"

    
    
    const url="https://qfhbxjelovjvyftsuynm.supabase.co"
    const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmaGJ4amVsb3ZqdnlmdHN1eW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTQ2MjEsImV4cCI6MjA2MjI5MDYyMX0.XbBGillpw0wm9ZdlgJ6ctqAHeAN_OF2OABHN_kMW1iw"
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
