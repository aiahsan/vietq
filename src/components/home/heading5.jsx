import React from 'react';
let Heading5 = ({ title, classes }) => {
    return classes ? <h5 className={classes}>{title}</h5> : <h5 className="heading-child1">{title}</h5>
}
export default Heading5;