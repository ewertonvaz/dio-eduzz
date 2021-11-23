import CryptoJs from 'crypto-js';

const secret = 'mentoria-eduzz-dio';

const generate = (email : string) : string => {
    const hash = CryptoJs.AES.encrypt(email, secret).toString();
    return hash;    
}

const validate = (token : string) : string => {
    const decrypt =  CryptoJs.AES.decrypt(token, secret);
    const email = decrypt.toString(CryptoJs.enc.Utf8);
    return email;
}

export const Token = {
    generate,
    validate
}