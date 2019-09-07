import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import styles from "./post-video.module.css";

export const postListQuery = graphql`
  query($id: String!) {
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
  }
`;

const IndexPage = ({ data, ...props }) => {
  const post = data.mysqlPost;

  const postmeta = post.postmetas.reduce(
    (acc, meta) => ({ ...acc, [meta.meta_name]: meta.meta_value }),
    {},
  );

  return (
    <Layout>
      {postmeta.video_file && (
        <div className={styles.container}>
          <iframe
            className={styles.iframe}
            title="player"
            type="text/html"
            width="640"
            height="360"
            src={
              postmeta.video_server === "y"
                ? `https://www.youtube.com/embed/${postmeta.video_file}`
                : `https://player.vimeo.com/video/${postmeta.video_file}?title=0&byline=0&portrait=0`
            }
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}

      <h1
        dangerouslySetInnerHTML={{ __html: `${post.title} - ${post.subtitle}` }}
      />
      <p dangerouslySetInnerHTML={{ __html: post.body }} />
    </Layout>
  );
};

export default IndexPage;
