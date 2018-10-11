import React, { Component } from 'react';
import Layout from '../components/layout'
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

export default class BlogPost extends Component {
  render() {
    const {
        title,
        author,
        body
    } = this.props.data.contentfulBlog;
    return (
        <Layout>
            <h1>{title}</h1>
            <h2>{author.name}</h2>
            <div dangerouslySetInnerHTML={{__html: body.childMarkdownRemark.html}} />
        </Layout>
    )
  }
}

BlogPost.propTypes = {
    data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
    query blogPostQuery($slug: String!){
        contentfulBlog(slug: {eq: $slug}) {
            title
            slug
            author {
                name
            }
            body {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`
