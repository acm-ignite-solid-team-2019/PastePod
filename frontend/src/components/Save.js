import React from 'react'
import { withWebId } from '@solid/react'

const Save = withWebId(props =>
    <button onClick={() => props.onSave(props.webId)}>Save</button>
);

export default Save;