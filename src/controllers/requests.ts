import dns from "dns";
import {urlModel} from '../models/mongo'

const check_url =  async (url: string) =>{
    let result:boolean =false;
    await dns.lookup(url,(err)=>{
          if(err) result = false
          result =  true
      });
    return await result
} 

const check_db = async (url:string)=>{
    try {
        const result = await urlModel.findOne({"origina_url":url});
        if(result){
            return result
        }
        return false
    } catch (error) {
        console.log(error.message) 
    }
}


export const post_short_Url =async  (url:string)=>{
    const reg:RegExp = /[^http://|https://].+/;
    const uri: RegExpMatchArray|null = url.match(reg);

    try {
        const okay_url = uri && await check_url(uri[0])
        if(!okay_url){
            return {error:"please check your link"}
        }

        const db_check = uri && await check_db(uri[0])
        if(db_check){
            return {url:db_check._id}
        }

        const url_saving = new urlModel({original_url:uri})
        url_saving.save()
        return {url:url_saving._id}
        
    } catch (error) {
        console.log(error.message)
        return {error:"please check your input and try again"}
    }
}


export const find_uri = async (uri:string)=>{

}
