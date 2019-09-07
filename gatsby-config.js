module.exports = {
  siteMetadata: {
    title: `If You Make It`,
    description: `Rewriting the site with Gatsby`,
    author: `@ Dave Garwacke`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        },
        queries: [
          {
            idFieldName: "cat_id",
            name: "category",
            statement: "SELECT * FROM category",
          },
          {
            foreignKey: "category",
            idFieldName: "id",
            name: "post",
            parentName: "category",
            statement: "SELECT * FROM posts",
          },
          {
            foreignKey: "post_id",
            idFieldName: "meta_id",
            name: "postmeta",
            parentName: "post",
            statement: "SELECT * FROM postmeta",
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },

    `gatsby-plugin-offline`,
  ],
};
