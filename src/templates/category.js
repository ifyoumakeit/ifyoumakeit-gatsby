import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";

export const postListQuery = graphql`
  query Posts($skip: Int!, $limit: Int!, $slug: String!) {
    mysqlCategory(cat_slug: { eq: $slug }) {
      cat_slug
      cat_id
      cat_title
    }
    allMysqlPost(
      limit: $limit
      skip: $skip
      sort: { fields: date, order: DESC }
      filter: { publish: { eq: 1 }, category: { cat_slug: { eq: $slug } } }
    ) {
      edges {
        node {
          title
          title_slug
          subtitle
          subtitle_slug
        }
      }
    }
  }
`;

const IndexPage = ({ data, pageContext }) => {
  const { categoryPostSlug } = pageContext;
  const posts = data.allMysqlPost.edges;

  return (
    <Layout>
      <h1>{data.mysqlCategory.cat_title}</h1>
      {posts.map(({ node: post }) => (
        <div key={post.title}>
          <h2>
            {/* <Img fluid={image} /> */}
            <a
              href={`/${categoryPostSlug}/${post.title_slug}/${post.title_slug}`}
            >
              {post.title} - {post.subtitle}
            </a>
          </h2>
        </div>
      ))}
    </Layout>
  );
};

export default IndexPage;
