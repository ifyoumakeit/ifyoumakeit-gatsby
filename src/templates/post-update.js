import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

export const postListQuery = graphql`
  query($id: String!) {
    mysqlPost(id: { eq: $id }) {
      id
      title
      title_slug
      subtitle
      subtitle_slug
      postmetas {
        id
        meta_name
        meta_value
      }
      category {
        slug: cat_slug
        title: cat_title
      }
    }
  }
`;

const IndexPage = ({ data, ...props }) => {
  const post = data.mysqlPost;

  return (
    <Layout>
      <strong>{post.category.title}</strong>
      <h1>
        {post.title} - {post.subtitle}
      </h1>
    </Layout>
  );
};

export default IndexPage;
