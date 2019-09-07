import React from "react";
import Img from "gatsby-image";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import Layout from "../components/layout";
import styles from "./index.module.css";

export const postListQuery = graphql`
  query {
    allFile(filter: { name: { glob: "*square*" } }) {
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
    allMysqlCategory(filter: { cat_publish: { eq: 1 } }) {
      edges {
        node {
          cat_slug
          cat_id
          cat_title
          categorytype {
            slug
          }
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
  const images = data.allFile.nodes;
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hi people</h1>
      <p>Welcome to If You Make It - Gatsby style.</p>
      <p>Now go build something great.</p>
      <div className={styles.categories}>
        {data.allMysqlCategory.edges.map(({ node: category }) => (
          <div className={styles.category} key={category.cat_title}>
            <h1>{category.cat_title}</h1>
            <div>
              {category.posts.slice(0, 2).map(post => {
                const image = images.find(
                  image =>
                    image.relativePath.indexOf(
                      `${post.title_slug}-${post.subtitle_slug}`,
                    ) > -1,
                );
                return (
                  <a
                    key={post.title_slug + post.subtitle_slug}
                    href={`${category.categorytype.slug}/${post.title_slug}/${post.subtitle_slug}`}
                  >
                    {image && <Img fluid={image.childImageSharp.fluid} />}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${post.title} - ${post.subtitle}`,
                      }}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;
