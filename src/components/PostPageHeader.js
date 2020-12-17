import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'
import Content from './Content'
import './PostPageHeader.css'

const PostPageHeader = ({
  title,
  subtitle,
  backgroundImage,
  large,
  className = ''
}) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative ${className}`}>
      {backgroundImage && (
        <Image
          background
          resolutions="large"
          src={backgroundImage}
          alt={title}
          size="cover"
        />
      )}
      <div className="PostTitleContainer container">
        <h1 className="PostPageHeader--Title">{title}</h1>
        {subtitle && (
          <Content className="PostPageHeader--Subtitle" src={subtitle} />
        )}
      </div>
    </div>
  )
}

PostPageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PostPageHeader
