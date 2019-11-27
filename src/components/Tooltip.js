import React from 'react'
import {Tooltip} from 'antd'

class Tooltips extends React.Component{
    render() {
        return(
            <div>
                {this.props.text&&this.props.text.length>this.props.textLenght?<Tooltip title={this.props.text}>
                    <div style={{textOverflow: 'ellipsis',wordBreak:'keepAll',  overflow: 'hidden', whiteSpace: 'nowrap', width:this.props.widths}}>{this.props.text}</div>
                </Tooltip>:this.props.text}
            </div>
        )
    }
}
export default Tooltips
