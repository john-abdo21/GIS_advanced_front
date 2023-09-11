import React from 'react';
import { Checkbox, ColorPicker } from 'antd'

import './css.css'

const ListItem = (props) => {
  return (
    <div className='item-set'>
      <Checkbox checked={props.show} onChange={props.showAction} />
      <span className='checkbox-label'>{props.text}</span>
      {/* <span>{props.icon}</span> */}
      <ColorPicker
        size="small"
        value={props.color}
        onChangeComplete={props.action}
        disabledAlpha={true}
      />
    </div>
  )
}

export default ListItem