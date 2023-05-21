import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HackerRankTests = () => {
  return (
    <Container>
      <Card className="m-5 p-5">
        <Card.Body>
          <Card.Title>Notice</Card.Title>
          <Card.Text>This page is still under construction.</Card.Text>
          <Link to="/">Go to homepage</Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HackerRankTests;
