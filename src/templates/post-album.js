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

const IndexPage = ({ data }) => {
  const post = data.mysqlPost;
  const postmeta = post.postmetas.reduce(
    (acc, meta) => ({ ...acc, [meta.meta_name]: meta.meta_value }),
    {},
  );
  return (
    <Layout>
      <strong>{post.category.title}</strong>
      <h1>
        {post.title} - {post.subtitle}
      </h1>
      <figure>
        <figcaption>Listen to the T-Rex:</figcaption>
        <audio
          controls
          src="https://iymialbum.s3.amazonaws.com/michael-cantor-funeral-season.mp3"
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </figure>

      {postmeta.album_tracklist}

      <p dangerouslySetInnerHTML={{ __html: post.body }} />
    </Layout>
  );
};

export default IndexPage;
