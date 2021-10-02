import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { toMoneyFormat, toTokenFormat } from '../../../utils/formatter';

interface AssetTableItemProps {
  asset: Asset;
}

export const AssetTableItem: React.FC<AssetTableItemProps> = (
  props: AssetTableItemProps,
) => {
  const { asset } = props;

  return (
    <Card className="my-1">
      <Card.Body>
        <Container>
          <Row>
            <Col md={5}>
              <div>
                <p>{asset.name}</p>
                <p>{toMoneyFormat(asset.price)}</p>
              </div>
            </Col>
            <Col md={3}>
              <p>{toTokenFormat(asset.total)}</p>
              <p>{toMoneyFormat(asset.total * asset.price)}</p>
            </Col>
            <Col md={2}>
              <p>{toMoneyFormat(asset.available)}</p>
            </Col>
            <Col md={2}>
              <p>{toMoneyFormat(asset.locked)}</p>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};
