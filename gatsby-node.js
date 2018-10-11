/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

// You can delete this file if you're not using it
exports.createPages = ({
  graphql,
  boundActionCreators,
}) => {
    const {createPage} = boundActionCreators;
    return new Promise((resolve, reject) => {
        resolve(
            graphql(`
                {
                    allContentfulBlog (limit:100) {
                        edges {
                            node {
                                id
                                slug
                            }
                        }
                    }
                }
            `).then((result) => {
                if (result.errors) {
                    reject(result.errors);
                }
                result.data.allContentfulBlog.edges.forEach((edge) => {
                    createPage({
                        path: edge.node.slug,
                        component: blogPostTemplate,
                        context: {
                            slug: edge.node.slug,
                        }
                    })
                })
                resolve();
            })
        )
    })
}
