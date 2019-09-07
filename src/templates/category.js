import React from "react";

import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import styles from "./category.module.css";

export const postListQuery = graphql`
  query Posts(
    $skip: Int!
    $limit: Int!
    $slug: String!
    $categoryPostSlug: String!
  ) {
    allFile(
      filter: {
        relativeDirectory: { eq: $categoryPostSlug }
        name: { glob: "*square*" }
      }
    ) {
      nodes {
        relativePath
        publicURL
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
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
  const {
    categoryPostSlug,
    skip,
    slug,
    limit,
    currentPage,
    numPages,
  } = pageContext;
  const posts = data.allMysqlPost.edges;
  const images = data.allFile.nodes;
  console.log({ images });

  return (
    <Layout>
      <h1>{data.mysqlCategory.cat_title}</h1>
      <div className={styles.grid}>
        {posts.map(({ node: post }) => {
          const path = `${categoryPostSlug}/${post.title_slug}-${post.subtitle_slug}-square.jpg`;
          const image = images.find(image => image.relativePath.includes(path));
          return (
            <div key={post.title} className={styles.post}>
              {image && <Img fluid={image.childImageSharp.fluid} />}
              <h2>
                <a
                  href={`/${categoryPostSlug}/${post.title_slug}/${post.title_slug}`}
                >
                  {post.title} - {post.subtitle}
                </a>
              </h2>
            </div>
          );
        })}
      </div>
      {skip}| {limit}|{currentPage}|{numPages}
      <div className={styles.pagination}>
        {Array.from({ length: numPages }, (_, i) => (
          <a
            className={styles.pagelink}
            href={`/category/${slug}/${i ? i : ""}`}
            key={i}
          >
            {i + 1}
          </a>
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;
