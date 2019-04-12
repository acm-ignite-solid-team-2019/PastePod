import Cryptr from 'cryptr'
import randomstring from 'randomstring'
import auth from "solid-auth-client";

class Encrypt {
    constructor() {
        this.password = "password";
        this.nextpassword = "";
        this.pods = ['https://evansun.solid.community/public/', 'https://evansun.solid.community/public/', 'https://evansun.solid.community/public/', 'https://evansun.solid.community/public/'];
    }

    encrypt = (text) => {
        const splits = 4;
        let data = [];
        let length = text.length;
        this.nextpassword = randomstring.generate(10);
        for (let i = 0; i < splits; i++) {
            if (i !== splits - 1) {
                data.push(this.encryptJson({
                    'data': text.substring(i * Math.floor(length / splits), (i + 1) * Math.floor(length / splits)),
                    "location": this.pods[i],
                    "password": this.nextpassword.substr(this.nextpassword.length - 10)
                }));
                console.log(this.nextpassword);
                console.log(this.nextpassword.substr(this.nextpassword.length - 10));
                this.nextpassword += randomstring.generate(10)
            } else {
                data.push(this.encryptJson({
                    'data': text.substring(i * Math.floor(length / splits), (i + 1) * Math.floor(length / splits)),
                    "location": "EOF",
                    "password": "EOF"
                }))
            }
        }
        return data
    };

    decrypt = (loc, password) => {
        let data = [];
        auth.fetch(loc).then(response => response.text()).then(text => {
            data.push(this.decryptJson(text, password));
            let newLoc = data.slice(-1)[0].location;
            let newPass = data.slice(-1)[0].password;

            let getText = response => response.text();
            let push = text => data.push(this.decryptJson(text, newPass));

            while (newLoc !== "EOF") {
                auth.fetch(newLoc).then(getText).then(push);
                newLoc = data.slice(-1)[0].location;
                newPass += data.slice(-1)[0].password
            }
        })
    };

    encryptJson = (json) => {
        let cryptr = new Cryptr(this.password);
        return cryptr.encrypt(JSON.stringify(json))
    };

    decryptJson = (json, password) => {
        let decryptr = new Cryptr(password);
        return JSON.parse(decryptr.decrypt(json))
    };
}

export default Encrypt;