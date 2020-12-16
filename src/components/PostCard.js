import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './PostCard.css'
import Moment from 'react-moment'

const PostCard = ({
  featuredImage,
  title,
  date,
  excerpt,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  <Link to={slug} className={`PostCard ${className}`}>
    {featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      <div className="PostCard--Category">
        <Moment format="MMMM Do, YYYY">
            {date}
        </Moment>
        <span> | </span>
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {excerpt && <div className="PostCard--Excerpt">{excerpt}</div>}
    </div>
  </Link>
)

export default PostCard
