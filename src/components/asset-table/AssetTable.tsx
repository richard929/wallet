import React from 'react'
import { Card } from 'react-bootstrap'

import { AssetTableHeader } from './asset-table-header'
import { AssetTableItem } from './asset-table-item'

interface AssetTableProps {
  assets?: Asset[]
}

export const AssetTable: React.FC<AssetTableProps> = (
  props: AssetTableProps,
) => {
  const { assets } = props

  return assets?.length ? (
    <>
      <AssetTableHeader />
      {assets.map((asset: Asset) => (
        <AssetTableItem key={asset.name} asset={asset} />
      ))}
    </>
  ) : (
    <Card>
      <Card.Body>
        <p className="text-center mb-0">
          <strong>No assets</strong>
        </p>
      </Card.Body>
    </Card>
  )
}
