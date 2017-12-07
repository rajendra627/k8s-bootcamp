import React from 'react';
import FilterLink from '../containers/FilterLink';
import filter from '../constants/filter';

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter={filter.SHOW_ALL}>
      All
    </FilterLink>
    {', '}
    <FilterLink filter={filter.SHOW_ACTIVE}>
      Active
    </FilterLink>
    {', '}
    <FilterLink filter={filter.SHOW_COMPLETED}>
      Completed
    </FilterLink>
  </p>
);

export default Footer;