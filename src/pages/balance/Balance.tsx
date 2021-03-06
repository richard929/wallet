import React, { useMemo } from 'react'
import { Alert, Card, Container, Spinner } from 'react-bootstrap'

import { AssetTable } from '../../components/asset-table'
import { Overview } from '../../components/overview'
import {
  useGetAccountByAddressQuery,
  useGetPricesQuery,
} from '../../services/kava'
import { getAssets } from '../../utils/calculator.utils'

export const Balance: React.FC = () => {
  const prices = useGetPricesQuery(undefined, {
    pollingInterval: 5000,
  })
  const account = useGetAccountByAddressQuery(
    'kava1vlpsrmdyuywvaqrv7rx6xga224sqfwz3fyfhwq',
    {
      pollingInterval: 5000,
    },
  )

  const loading = useMemo(
    () => account.isLoading || prices.isLoading,
    [account, prices],
  )

  const assets = useMemo(
    () =>
      account.data && prices.data
        ? getAssets(account.data.result, prices.data.result)
        : [],
    [account, prices],
  )

  const error = useMemo(() => account.error || prices.error, [account, prices])

  return (
    <Container>
      <h3 className="m-3">Balances</h3>
      {loading && (
        <Card>
          <Card.Body>
            <div className="d-flex align-items-center justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </Card.Body>
        </Card>
      )}
      {error && <Alert variant="danger">Error fetching account data</Alert>}
      {!loading && !error && (
        <>
          <div className="mt-3 mb-5">
            <Overview assets={assets} />
          </div>
          <AssetTable assets={assets} />
        </>
      )}
    </Container>
  )
}
