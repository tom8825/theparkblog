import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'
import PostPageHeader from '../components/PostPageHeader'
import Moment from 'react-moment'
import Content from '../components/Content'
import Layout from '../components/Layout'
import './SinglePost.css'
import SEO from "../components/seo"
import { Helmet } from "react-helmet"

export const SinglePostTemplate = ({
  title,
  date,
  body,
  featuredImage,
  nextPostURL,
  prevPostURL,
  categories = []
}) => (
  <main>
    <Helmet
      titleTemplate={`${title} | The Park Blog`}
    >
      {title}
    </Helmet>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
        <Link className="SinglePost--BackButton" to="/">
          <ChevronLeft /> BACK
        </Link>
        <div className="SinglePost--Content relative">
        <PostPageHeader
            title={title}
            backgroundImage={featuredImage}
          /><br/>
          <div className="SinglePost--Meta">
            {/* {date && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {date}
              </time>
            )} */}
            <Moment format="MMMM Do, YYYY">
            {date}
            </Moment>
            {categories && (
              <Fragment>
                <span>|</span>
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                    className="SinglePost--Meta--Category"
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
          </div>

          {title && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}

          <div className="SinglePost--InnerContent">
            <Content source={body} />
          </div>

          <div className="SinglePost--Pagination">
            {prevPostURL && (
              <Link
                className="SinglePost--Pagination--Link prev"
                to={prevPostURL}
              >
                Previous Post
              </Link>
            )}
            {nextPostURL && (
              <Link
                className="SinglePost--Pagination--Link next"
                to={nextPostURL}
              >
                Next Post
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SinglePost for front-end
const SinglePost = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.theparkblog.com/post/" + post.frontmatter.title.replace(/\s+/g, '-').toLowerCase()
    },
    "headline": post.frontmatter.title,
    "description": post.frontmatter.excerpt,
    "image": post.frontmatter.featuredImage,  
    "author": {
      "@type": "Organization",
      "name": "TheParkBlog"
    },  
    "publisher": {
      "@type": "Organization",
      "name": "TheParkBlog",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.theparkblog.com/images/logo.png"
      }
    },
    "datePublished": post.frontmatter.date,
    "dateModified": post.frontmatter.date
  }

  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      
      <SEO title="Post" schemaMarkup={schema} />
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    settingsYaml {
      siteTitle
      siteDescription
      googleTrackingId
      socialMediaCard {
        image
      }
    }
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        date
        categories {
          category
        }
        excerpt
        slug
        featuredImage
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
