import { Link, StaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import styles from "./header.module.css";

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <h1 className={styles.title}>
      <Link className={styles.titlelink} to="/">
        {siteTitle}
      </Link>
    </h1>

    <StaticQuery
      query={graphql`
        query {
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
                  title_slug
                  subtitle_slug
                }
              }
            }
          }
        }
      `}
      render={data => (
        <nav>
          <ul className={styles.navlist}>
            {data.allMysqlCategory.edges.map(({ node }) => (
              <li key={node.cat_slug} className={styles.navitem}>
                <a
                  className={styles.navlink}
                  href={`/category/${node.cat_slug}`}
                >
                  {node.cat_title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    />
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
