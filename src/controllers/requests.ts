import dns from "dns";
import { urlModel } from "../models/mongo";

export const post_short_Url = async (url: string) => {
  const reg: RegExp = /[^http://|https://].+/;
  const uri: RegExpMatchArray | null = url.match(reg);
  try {
    if (uri) {
      const okay_url = await check_url(uri[0]);
      if (!okay_url) {
        return { error: "please check your link" };
      }
      const db_check = await check_db(uri[0]);
      if (db_check) {
        return { url: db_check._id };
      }
      const url_saving = new urlModel({ original_url: uri[0] as string });
      url_saving.save();
      return { url: url_saving._id };
    }
  } catch (error) {
    return { error: "please check your input and try again" };
  }
};

export const find_uri = async (_id: string) => {
  try {
    const get_url = await urlModel.findById(_id);
    return { url: get_url?.original_url };
  } catch (error) {
    return { error: "sorry doesnt exist" };
  }
};

const check_url = (url: string) => {
  return new Promise((resolve, reject) =>
    dns.lookup(url, (error) => {
      if (error) {
        return resolve(false);
      }
      return resolve(true);
    })
  );
};

const check_db = async (url: string) => {
  try {
    const result = await urlModel.findOne({ origina_url: url });
    if (result) {
      return result;
    }
    return false;
  } catch (error) {
    console.log(error.message);
  }
};
