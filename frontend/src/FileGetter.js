// import fileClient from "solid-file-client";
import {parse} from "uri-js";

const fileClient = require("solid-file-client");

class FileGetter {

    getFiles1 = async (folder) => {
        let files = [];
        const folderContents = await fileClient.readFolder(folder);
        for (let j of folderContents.files) {
            files.push(j)
        }

        for (let subFolder of folderContents.folders) {
            const folderContents = await this.getFiles1(subFolder.url);
            for (let j of folderContents.value) {
                files.push(j)
            }
        }

        return Promise.resolve({value: files, done: true});
    };

    getFiles = async (webId) => {
        let parsed = parse(webId);
        this.files = await this.getFiles1('https://' + parsed['host']);
        let listOfFiles = [];
        let i = 0;
        for (i = 0; i < this.files['value'].length; i++) {
            if (this.files['value'][i]['type'].substring(0, 4) === "text" && this.files['value'][i]['name'].length === 44) {
                listOfFiles.push(this.files['value'][i]['url'])
            }
        }

        return listOfFiles;
    };
}

export default FileGetter;