import CryptoJS from "crypto-js";
import configs from './config';

export const decrypt =(passwordEncrypt)=>{
    var bytes  = CryptoJS.AES.decrypt(passwordEncrypt,configs.encriptacion);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
    console.log(originalText); // 'my message'
}
export const crypt =(password)=>{
    var ciphertext = CryptoJS.AES.encrypt(password,configs.encriptacion).toString();
    return ciphertext;
}



