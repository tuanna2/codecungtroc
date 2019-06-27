import React from 'react';

import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
class Code extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            code : 'const x = 1;'
        }
    }
    render(){
        return (<div className = "container-fluid" style={{height:"500px",width: "%"}}>
            <CodeMirror
            value={this.state.code}
            options={{
                theme: 'monokai',
                tabSize: 2,
                keyMap: 'sublime',
                mode: 'jsx',
            }}
            />
        </div>)
    }
}

export default Code;