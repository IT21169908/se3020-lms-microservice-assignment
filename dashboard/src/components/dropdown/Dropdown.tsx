import React from 'react';
import {Link} from 'react-router-dom';
import {DropdownStyle} from './styled-elements';
import {DropdownProps} from "../../types/dropdown-types";
import type {MenuProps} from 'antd';

function Dropdown(props: DropdownProps) {
    const {
        content=menuProps,
        placement= 'bottomRight',
        title,
        trigger,
        children,
        style={},
        className='ninjadash-dropdown',
        // action= ['hover']
    } = props;

    return (
        <DropdownStyle
            overlayClassName={className}
            style={style}
            placement={placement}
            title={title}
            menu={content}
            trigger={trigger}
        >
            {children}
        </DropdownStyle>
    );
}

const content: MenuProps['items'] =
    [
        {
            label: <Link to="#"><span>Export to CSV</span></Link>,
            key: '0',
        },
        {
            label: <Link to="#"><span>Export to XML</span></Link>,
            key: '0',
        },
        {
            label: <Link to="#"><span>Export to Drive</span></Link>,
            key: '0',
        },

    ];

const menuProps: { items: MenuProps['items'] } = {
    items: content,
};




export {Dropdown};
