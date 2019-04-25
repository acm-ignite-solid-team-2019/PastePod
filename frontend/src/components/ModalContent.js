import React from 'react'
import {useLDflexList, useLDflexValue, withWebId} from "@solid/react";
import {parse} from "uri-js";

import "../style/Modal.css"

const ModalContent = withWebId(props => {
    if (!props.webId) return null;

    let parsed = parse(props.webId);
    const files = useLDflexList(`['${parsed.scheme}://${parsed.host}/public/solid-paste/']['http://www.w3.org/ns/ldp#contains']`);

    return (
        <div>
            <h2>Your Pastes</h2>
            <div className="Files">
                {
                    files.map((file, i) => {
                        let name = `${file}`;
                        let parsed = parse(name);
                        let comps = parsed.path.split("/");

                        return <File key={i} load={file => props.load(file)} file={comps[3]}/>
                    })
                }
            </div>
        </div>
    )
});

const File = props => (
    <button onClick={() => props.load(props.file)} className="File">
        {props.file}
    </button>
);

export default ModalContent;