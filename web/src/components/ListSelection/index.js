import React from 'react'
import "./ListSelection.less"
import {POSITION_CENTER} from "../../constants/common";

const ListSelection = ({
                           className = 'list-selection',
                           selected = '',
                           onClick = Function,
                           align = POSITION_CENTER,
                           // isMultiSelect = false,
                           width = 20,
                           height = 20,
                           items = []
                       }) => (
    <div className={className} style={{textAlign: align}}>
        {items.map(({
                        value = '',
                        bgColor = '#333333',
                        fnParam = ''
                    }, idxL) => (<div key={idxL}
                                      style={{
                                          backgroundColor: bgColor,
                                          width: width,
                                          height: height
                                      }}
                                      className={value === selected ? 'active' : ''}
                                      onClick={() => onClick(fnParam)}/>
        ))}
    </div>
)

export default ListSelection