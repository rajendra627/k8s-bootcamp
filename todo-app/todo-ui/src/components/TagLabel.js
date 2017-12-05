import React from 'react';
import PropTypes from 'prop-types';
import TAG_OPTIONS from '../constants/tagOptions';

const TagLabel = ({tag}) => {
    switch (tag){
      case TAG_OPTIONS[0].value:
        return <span className="label label-primary">{tag}</span>;

      case TAG_OPTIONS[1].value:
        return <span className="label label-success">{tag}</span>;

      case TAG_OPTIONS[2].value:
        return <span className="label label-info">{tag}</span>;

      case TAG_OPTIONS[3].value:
        return <span className="label label-warning">{tag}</span>;

      case TAG_OPTIONS[4].value:
        return <span className="label label-danger">{tag}</span>;

      case TAG_OPTIONS[5].value:
        return <span className="label label-info">{tag}</span>;

      default:
        return <span className="label label-default">{tag}</span>;
    }
};

TagLabel.propTypes = {
  tag: PropTypes.string.isRequired
};

export default TagLabel;