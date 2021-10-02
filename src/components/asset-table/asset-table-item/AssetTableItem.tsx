import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { toMoneyFormat, toTokenFormat } from '../../../utils/formatter'

interface AssetTableItemProps {
  asset: Asset
}

export const AssetTableItem: React.FC<AssetTableItemProps> = (
  props: AssetTableItemProps,
) => {
  const { asset } = props

  return (
    <Card className="my-1">
      <Card.Body>
        <Container>
          <Row className="align-items-center">
            <Col md={5} xs={3}>
              <p className="mb-0">{asset.name}</p>
              <p className="text-muted small mb-0">
                {toMoneyFormat(asset.price)}
              </p>
            </Col>
            <Col md={3} xs={3}>
              <p className="mb-0">{toTokenFormat(asset.total, asset.name)}</p>
              <p className="text-muted small mb-0">
                {toMoneyFormat(asset.total * asset.price)}
              </p>
            </Col>
            <Col md={2} xs={3}>
              <p className="mb-0">
                {toMoneyFormat(asset.available * asset.price)}
              </p>
            </Col>
            <Col md={2} xs={3}>
              <p className="mb-0">
                {toMoneyFormat(asset.locked * asset.price)}
              </p>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
}
