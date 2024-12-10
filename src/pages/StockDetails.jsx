import React from 'react';
import TradingViewWidget from '../components/TradingViewWidget';
import StockDetailTable from '../components/StockDetailTable';

function StockDetails() {
  return (
    <div>
      <TradingViewWidget />
      <StockDetailTable />
    </div>
  );
}

export default StockDetails;
