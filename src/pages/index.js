import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const BlogPost = props => {
  const { node } = props
  return (
    <li>
      <Link to={node.slug}>{node.title}</Link>
      <img src={node.heroImage.resize.src} />
      <div>{node.body.childMarkdownRemark.excerpt}</div>
    </li>
  )
}

const IndexPage = props => {
  const { data } = props
  console.log('inside index page')
  console.log(props)
  return (
    <Layout>
      <ul>
        {data.allContentfulBlog.edges.map(edge => (
          <BlogPost node={edge.node} />
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query pageQuery {
    allContentfulBlog(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          title
          slug
          author {
            name
          }
          body {
            childMarkdownRemark {
              excerpt
            }
          }
          heroImage {
            resize(width: 300, height: 300) {
              src
            }
          }
        }
      }
    }
  }
`
