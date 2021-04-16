import React from 'react';
import { withRouter } from 'react-router-dom';
import './menu-item.styles.scss';

// withRouter is a higher order component
// higher order component is a function that takes a component and modifies it, then returns it
// bu wrapping this component we now have access to history

const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (
    <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <div className='background-image' style={{backgroundImage: `url(${imageUrl})`}} />
        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
)

export default withRouter(MenuItem);
