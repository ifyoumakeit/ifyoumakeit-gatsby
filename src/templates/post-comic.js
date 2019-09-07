import React from "react";
import Img from "gatsby-image";
import { graphql } from "gatsby";

import Layout from "../components/layout";

export const postListQuery = graphql`
  query($id: String!, $imageSlug: String!) {
    mysqlPost(id: { eq: $id }) {
      id
      title
      title_slug
      subtitle
      subtitle_slug
      body
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
    allFile(
      filter: {
        name: { glob: "!*-square" }
        relativePath: { glob: $imageSlug }
      }
    ) {
      edges {
        node {
          id
          relativePath
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const post = data.mysqlPost;
  const images = data.allFile.edges;

  return (
    <Layout>
      <strong>{post.category.title}</strong>
      <h1>
        {post.title} - {post.subtitle}
      </h1>
      <p dangerouslySetInnerHTML={{ __html: post.body }} />
      {images.map(({ node }) => (
        <Img fluid={node.childImageSharp.fluid} />
      ))}
    </Layout>
  );
};

export default IndexPage;
