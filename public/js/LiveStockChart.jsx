// Save this as js/LiveStockChart.jsx
const LiveStockChart = () => {
    const [stockData, setStockData] = React.useState([]);
    const [stockInfo, setStockInfo] = React.useState({
      symbol: 'AAPL',
      name: 'Apple Inc.',
      sector: 'Technology',
      marketCap: '2.8T'
    });
  
    // Calculate technical indicators
    const calculateMA = (data, period) => {
      return data.map((item, index) => {
        if (index < period - 1) return null;
        const sum = data.slice(index - period + 1, index + 1)
          .reduce((acc, curr) => acc + curr.close, 0);
        return sum / period;
      });
    };
  
    const calculateRSI = (data, period = 14) => {
      let gains = [], losses = [];
      
      for (let i = 1; i < data.length; i++) {
        const change = data[i].close - data[i - 1].close;
        gains.push(change > 0 ? change : 0);
        losses.push(change < 0 ? -change : 0);
      }
      
      const avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
      const avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
      
      return avgLoss === 0 ? 100 : 100 - (100 / (1 + avgGain / avgLoss));
    };
  
    // Generate realistic OHLC data
    const generateCandleData = (lastClose) => {
      const volatility = lastClose * 0.02;
      const open = lastClose + (Math.random() - 0.5) * volatility;
      const high = Math.max(open, open + Math.random() * volatility);
      const low = Math.min(open, open - Math.random() * volatility);
      const close = low + Math.random() * (high - low);
      const volume = Math.floor(Math.random() * 1000000) + 500000;
      
      return { open, high, low, close, volume };
    };
  
    React.useEffect(() => {
      // Initialize with 20 data points
      const initialData = Array.from({ length: 20 }, (_, i) => {
        const basePrice = 150;
        const timestamp = new Date(Date.now() - (19 - i) * 5000);
        return {
          timestamp: timestamp.toLocaleTimeString(),
          ...generateCandleData(basePrice + Math.random() * 10),
        };
      });
  
      setStockData(initialData);
  
      // Update every 5 seconds
      const interval = setInterval(() => {
        setStockData(prevData => {
          const newData = [...prevData.slice(1)];
          const lastClose = newData[newData.length - 1].close;
          newData.push({
            timestamp: new Date().toLocaleTimeString(),
            ...generateCandleData(lastClose),
          });
          return newData;
        });
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);
  
    const ma20 = calculateMA(stockData, 20);
    const ma50 = calculateMA(stockData, 50);
    const currentRSI = calculateRSI(stockData);
  
    return (
      <div className="chart-container" style={{margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
          <div>
            <span style={{fontSize: '24px'}}>{stockInfo.symbol}</span>
            <span style={{marginLeft: '16px', color: '#666'}}>{stockInfo.name}</span>
          </div>
          <div style={{textAlign: 'right'}}>
            <div style={{
              fontSize: '20px',
              color: stockData.length >= 2 && 
                stockData[stockData.length - 1].close > stockData[stockData.length - 2].close 
                ? '#22c55e' 
                : '#ef4444'
            }}>
              ${stockData[stockData.length - 1]?.close.toFixed(2)}
            </div>
            <div style={{fontSize: '14px', color: '#666'}}>Market Cap: {stockInfo.marketCap}</div>
          </div>
        </div>
  
        <Recharts.ComposedChart
          width={800}
          height={400}
          data={stockData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <Recharts.CartesianGrid strokeDasharray="3 3" />
          <Recharts.XAxis dataKey="timestamp" />
          <Recharts.YAxis yAxisId="price" domain={['auto', 'auto']} />
          <Recharts.YAxis yAxisId="volume" orientation="right" />
          <Recharts.Tooltip />
          <Recharts.Legend />
          
          <Recharts.Bar
            yAxisId="price"
            dataKey="high"
            fill="none"
            stroke="#333"
            isAnimationActive={false}
          />
          <Recharts.Bar
            yAxisId="price"
            dataKey="low"
            fill="none"
            stroke="#333"
            isAnimationActive={false}
          />
          <Recharts.Bar
            yAxisId="price"
            dataKey={d => [d.open, d.close]}
            fill={d => d.open > d.close ? '#ef4444' : '#22c55e'}
            stroke={d => d.open > d.close ? '#ef4444' : '#22c55e'}
            isAnimationActive={false}
          />
          
          <Recharts.Line
            yAxisId="price"
            type="monotone"
            data={ma20}
            stroke="#2196F3"
            dot={false}
            name="MA20"
          />
          <Recharts.Line
            yAxisId="price"
            type="monotone"
            data={ma50}
            stroke="#673AB7"
            dot={false}
            name="MA50"
          />
          
          <Recharts.Bar
            yAxisId="volume"
            dataKey="volume"
            fill="#9CA3AF"
            opacity={0.3}
            name="Volume"
          />
        </Recharts.ComposedChart>
  
        <div style={{
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }}>
          <div style={{padding: '16px', border: '1px solid #ddd', borderRadius: '4px'}}>
            <h3 style={{fontWeight: 'bold'}}>RSI (14)</h3>
            <p style={{
              fontSize: '18px',
              color: currentRSI > 70 ? '#ef4444' : 
                     currentRSI < 30 ? '#22c55e' : 
                     '#374151'
            }}>
              {currentRSI.toFixed(2)}
            </p>
          </div>
          <div style={{padding: '16px', border: '1px solid #ddd', borderRadius: '4px'}}>
            <h3 style={{fontWeight: 'bold'}}>MA20</h3>
            <p style={{fontSize: '18px'}}>${ma20[ma20.length - 1]?.toFixed(2) || 'N/A'}</p>
          </div>
          <div style={{padding: '16px', border: '1px solid #ddd', borderRadius: '4px'}}>
            <h3 style={{fontWeight: 'bold'}}>MA50</h3>
            <p style={{fontSize: '18px'}}>${ma50[ma50.length - 1]?.toFixed(2) || 'N/A'}</p>
          </div>
        </div>
      </div>
    );
  };
  
  // Export for mounting
  window.LiveStockChart = LiveStockChart;