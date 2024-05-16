import React from 'react';
import {Check} from "react-bootstrap-icons";
import {Link} from 'react-router-dom';
import {Content, PopoverStyle, Title} from './styled-elements';
import {PopupProps} from "../../types/popup-types";

const contentProp = (
    <>
        <Link to="#">
            <Check/>
            <span>Btn Dropdown one</span>
        </Link>
        <Link to="#">
            <Check/>
            <span>Btn Dropdown two</span>
        </Link>
        <Link to="#">
            <Check/>
            <span>Btn Dropdown three</span>
        </Link>
    </>
);

function Popover(props: PopupProps) {
    const {content = contentProp, placement = 'bottom', title, action = 'hover', children} = props;
    const content1 = <Content>{content}</Content>;

    return (
        <PopoverStyle
            placement={placement}
            title={title && <Title>{title}</Title>}
            content={content1}
            trigger={action}
        >
            {children}
        </PopoverStyle>
    );
}

// Popover.defaultProps = {
//     action: 'hover',
//     placement: 'bottom',
//     content:contentProp,
// };


export {Popover};
