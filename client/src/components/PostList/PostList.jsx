import React from 'react';
import { Row, Col, ListGroup } from 'reactstrap';
import { useSelector } from 'react-redux';
import PostItem from '../PostItem';

export default function PostList() {
  const posts = useSelector((state) => state.posts);
  return (
    <Row>
      <Col>
        <ListGroup>
          {posts && posts?.map((el) => <PostItem key={el.id} post={el} id={el.id} />)}
        </ListGroup>
      </Col>
    </Row>
  );
}
