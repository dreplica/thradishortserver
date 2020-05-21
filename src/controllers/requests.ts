import dns from "dns";
import {urlModel} from '../models/mongo'

const check_url =  (url: string) => dns.lookup(url,(err)=>{
      if(err) return false
      return true
  });

const check_db = async (url:string)=>{
    try {
        const result = await urlModel.findOne({"origina_url":url});
        if(result){
            return true
        }
        return false
    } catch (error) {
        console.log(error.message) 
    }
}


const post_short_Url =async  (url)=>{
    const uri = url.match(/[^http://|https://].+/)
    const okay_url = await check_url(url)
    try {
        
    } catch (error) {
        
    }
}
