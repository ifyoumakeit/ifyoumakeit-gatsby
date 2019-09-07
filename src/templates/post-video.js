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

const IndexPage = ({ data, ...props }) => {
  const post = data.mysqlPost;

  const embed = post.postmetas.find(meta => meta.meta_name === "video_file");
  return (
    <Layout>
      <strong>{post.category.title}</strong>
      <h1>
        {post.title} - {post.subtitle}
      </h1>
      <p dangerouslySetInnerHTML={{ __html: post.body }} />
      {embed && (
        <iframe
          title="player"
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${embed.meta_value}`}
          frameBorder="0"
        />
      )}
    </Layout>
  );
};

export default IndexPage;
