import React from 'react'
import { withWebId } from '@solid/react'

const Save = withWebId(props =>
    <button className="Save-Button" onClick={() => props.onSave(props.webId)} disabled={!props.canSave}>Save</button>
);

export default Save;