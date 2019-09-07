const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const getCategoryPostSlug = require("./get-category-post-slug.js");

const CATEGORIES_PER_PAGE = 12;

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMysqlCategory(filter: { cat_publish: { eq: 1 } }) {
        edges {
          node {
            cat_slug
            cat_id
            posts {
              id
              title_slug
              subtitle_slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // ...

  // Create blog-list pages
  const categories = result.data.allMysqlCategory.edges;

  categories.forEach(category => {
    const slug = category.node.cat_slug;
    const categoryPostSlug = getCategoryPostSlug(category.node);
    const numPages = Math.ceil(
      category.node.posts.length / CATEGORIES_PER_PAGE,
    );

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `category/${slug}` : `category/${slug}/${i + 1}`,
        component: path.resolve("./src/templates/category.js"),
        context: {
          limit: CATEGORIES_PER_PAGE,
          skip: i * CATEGORIES_PER_PAGE,
          categoryPostSlug,
          slug,
          numPages,
          currentPage: i + 1,
        },
      });

      category.node.posts.forEach(post => {
        createPage({
          path: `${getCategoryPostSlug(category.node)}/${post.title_slug}/${
            post.subtitle_slug
          }`,
          component: path.resolve(
            `./src/templates/post-${categoryPostSlug}.js`,
          ),
          context: {
            categoryPostSlug,
            id: post.id,
            imageSlug: `${categoryPostSlug}/${post.title_slug}-${post.subtitle_slug}*`,
          },
        });
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
