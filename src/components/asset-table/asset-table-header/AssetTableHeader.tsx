import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const AssetTableHeader: React.FC = () => (
  <Container>
    <Row>
      <Col md={5}>
        <p>Asset</p>
      </Col>
      <Col md={3}>
        <p>Total</p>
      </Col>
      <Col md={2}>
        <p>Available</p>
      </Col>
      <Col md={2}>
        <p>Locked</p>
      </Col>
    </Row>
  </Container>
);
