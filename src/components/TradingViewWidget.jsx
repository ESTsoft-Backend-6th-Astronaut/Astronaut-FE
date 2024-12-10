import React, { useEffect, useRef } from 'react';

function TradingViewWidget() {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;

    script.onload = () => {
      new window.TradingView.widget({
        container_id: containerRef.current.id,
        autosize: true,
        symbol: 'BINANCE:BTCUSDT',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'kr',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        studies: ['RSI@tv-basicstudies'],
        hide_side_toolbar: false,
      });
    };

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div
      id="tradingview_chart"
      ref={containerRef}
      style={{ height: '500px' }}
    />
  );
}

export default TradingViewWidget;
