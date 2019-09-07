import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import Layout from "../components/layout";

export const postListQuery = graphql`
  query {
    allMysqlCategory(filter: { cat_publish: { eq: 1 } }) {
      edges {
        node {
          cat_slug
          cat_id
          cat_title
          posts {
            id
            title
            title_slug
            subtitle
            subtitle_slug
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hi people</h1>
      <p>Welcome to If You Make It - Gatsby style.</p>
      <p>Now go build something great.</p>

      {data.allMysqlCategory.edges.map(({ node: category }) => (
        <div>
          <h1>{category.cat_title}</h1>
          <div>
            {category.posts.slice(0, 2).map(post => (
              <a href={`${post.title_slug}/${post.subtitle_slug}`}>
                {post.title} - {post.subtitle}
              </a>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default IndexPage;
