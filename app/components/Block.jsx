import React  from 'react';

export default ({position,top, left, width, height, color}) => {
    return (
        <div
            style={{
                position: position,
                top: top,
                left: left,
                width: width,
                height: height,
                backgroundColor: color
            }}/>
    );
}
