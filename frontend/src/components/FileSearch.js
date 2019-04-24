import React from 'react'
import { withWebId } from '@solid/react'

const FileSearch = withWebId(props =>
    <button onClick={() => props.getFiles(props.webId)}>Search for Files</button>
);

export default FileSearch;
