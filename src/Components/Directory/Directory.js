import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/DirectoryReducer/directoryReducer';

import MenuItem from "../MenuItem/MenuItem";

import './directory.styles.scss';

const Directory = ({sections}) => (
    // used the spread operator below to spread in everything not id as otherSectionProps
    // We can then use those and spread them again for MenuItem
    <div className='directory-menu'>
      {sections.map(({id, ...otherSectionProps}) => (
        <MenuItem  key={id} {...otherSectionProps}/>
      ))}
    </div>
) 

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);