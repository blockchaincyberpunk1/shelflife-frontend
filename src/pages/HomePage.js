/** HomePage.js
 * Main homepage displaying the user's shelves and books.
 * Uses Ant Design for layout, Emotion for styling, and custom components like ShelfList and BookList.
 * Also includes animation from React Spring and optimization using react-lazyload.
 */

import React from 'react';
import { Layout, Row, Col } from 'antd'; // Import Ant Design components for layout
import { css } from '@emotion/react'; // Emotion for CSS-in-JS styling
import { useShelf } from '../../context/ShelfContext'; // Context for shelves
import { useBook } from '../../context/BookContext'; // Context for books
import ShelfList from '../shelves/ShelfList'; // Component to display list of shelves
import BookList from '../books/BookList'; // Component to display list of books
import { useAuth } from '../../context/AuthContext'; // Context for authentication
import { useSpring, animated } from 'react-spring'; // React Spring for animations
import LazyLoad from 'react-lazyload'; // Lazy loading images for optimization

// Ant Design Layout Components
const { Header, Content, Sider } = Layout;

const HomePage = () => {
  const { user } = useAuth(); // Retrieve the authenticated user
  const { shelves } = useShelf(); // Retrieve the user's shelves
  const { books } = useBook(); // Retrieve the user's books

  // Animation for the shelf list
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-20px)' },
  });

  // Emotion CSS for custom styling
  const homePageStyles = css`
    .homepage {
      background-color: #312c49;
      color: white;
      min-height: 100vh;
    }
    .sider {
      background-color: #494761;
    }
    .content {
      padding: 24px;
    }
    .header {
      background-color: #3c3853;
      color: white;
      text-align: center;
      font-size: 1.5rem;
    }
  `;

  return (
    <Layout className="homepage" css={homePageStyles}>
      {/* Ant Design Header */}
      <Header className="header">
        Welcome {user?.username}, to ShelfLife! {/* Display the user's name */}
      </Header>

      <Layout>
        {/* Ant Design Sider for the shelf list */}
        <Sider width={300} className="sider">
          <animated.div style={springProps}>
            {/* ShelfList with lazy loading */}
            <LazyLoad height={200} offset={100}>
              <ShelfList shelves={shelves} />
            </LazyLoad>
          </animated.div>
        </Sider>

        {/* Main content area */}
        <Content className="content">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <h2>Books from All Shelves</h2>

              {/* BookList with lazy loading */}
              <LazyLoad height={200} offset={100}>
                <BookList books={books} />
              </LazyLoad>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
