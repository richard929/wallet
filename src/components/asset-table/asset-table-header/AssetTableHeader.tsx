import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export const AssetTableHeader: React.FC = () => (
  <Container className="my-1">
    <Row className="mx-2">
      <Col md={5} xs={3}>
        <p>Asset</p>
      </Col>
      <Col md={3} xs={3}>
        <p>Total</p>
      </Col>
      <Col md={2} xs={3}>
        <p>Available</p>
      </Col>
      <Col md={2} xs={3}>
        <div className="d-flex align-items-center">
          <p className="mb-0">Locked</p>
          <div className="d-flex mx-2">
            <FontAwesomeIcon color="grey" size="sm" icon={faLock} />
          </div>
        </div>
      </Col>
    </Row>
  </Container>
)
