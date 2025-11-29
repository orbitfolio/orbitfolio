'use client'

import Papa from 'papaparse'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState } from 'react'
import Fuse from 'fuse.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const assets = [
  { id: 1, name: 'Apple Inc', ticker: 'AAPL', type: 'Stock • US' },
  { id: 2, name: 'Microsoft', ticker: 'MSFT', type: 'Stock • US' },
  { id: 3, name: 'Google', ticker: 'GOOGL', type: 'Stock • US' },
  { id: 4, name: 'Tesla', ticker: 'TSLA', type: 'Stock • US' },
  { id: 5, name: 'Nvidia', ticker: 'NVDA', type: 'Stock • US' },
  { id: 6, name: 'Amazon', ticker: 'AMZN', type: 'Stock • US' },
  { id: 7, name: 'Bitcoin', ticker: 'BTC', type: 'Crypto' },
  { id: 8, name: 'Ethereum', ticker: 'ETH', type: 'Crypto' },
  { id: 9, name: 'Gold Spot', ticker: 'XAUUSD', type: 'Commodity' },
  { id: 10, name: 'Reliance Industries', ticker: 'RELIANCE.NS', type: 'Stock • India' },
  { id: 11, name: 'HDFC Bank', ticker: 'HDFCBANK.NS', type: 'Stock • India' },
  { id: 12, name: 'TCS', ticker: 'TCS.NS', type: 'Stock • India' },
  { id: 13, name: 'Royal Bank of Canada', ticker: 'RY.TO', type: 'Stock • Canada' },
  { id: 14, name: 'Shopify', ticker: 'SHOP.TO', type: 'Stock • Canada' },
  { id: 15, name: 'Adani Ports', ticker: 'ADANIPORTS.NS', type: 'Stock • India' },
]

const fuse = new Fuse(assets, { keys: ['name', 'ticker', 'type'], threshold: 0.3 })

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [holdings, setHoldings] = useState<any[]>([])

  // Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    if (term.length >= 2) {
      const found = fuse.search(term)
      setResults(found.map(r => r.item))
    } else {
      setResults([])
    }
  }

  // CSV — supports click OR drag & drop
  const processFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: (res) => {
        const data = res.data.filter((row: any) => row.Ticker || row.Symbol)
        setHoldings(data)
      }
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const handleClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.csv'
    input.onchange = (e: any) => {
      const file = e.target.files[0]
      if (file) processFile(file)
    }
    input.click()
  }

  const data = {
    labels: ['Stocks', 'Gold', 'Crypto', 'Real Estate', 'Mutual Funds', 'NFTs', 'Cash'],
    datasets: [{
      data: [42, 18, 15, 12, 8, 3, 2],
      backgroundColor: ['#4338CA', '#FCD34D', '#A855F7', '#F472B6', '#10B981', '#EC4899', '#7DD3FC'],
      borderWidth: 2,
      hoverOffset: 12
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: '#FCD34D' } }
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-indigo-950 via-purple-950 to-rose-950 text-white">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gold to-rose bg-clip-text text-transparent text-center mb-4">
          Orbit Folio
        </h1>
        <p className="text-center text-sky text-xl mb-12">Your global wealth, one radiant orbit away</p>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search AAPL, Reliance, Gold..."
            className="w-full p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-gold"
          />
          {results.length > 0 && (
            <ul className="mt-3 bg-gray-800 rounded-xl border border-gray-700">
              {results.map(a => (
                <li key={a.id} className="p-3 hover:bg-gold/20 cursor-pointer flex justify-between border-b border-gray-700 last:border-0">
                  <span>{a.name} ({a.ticker})</span>
                  <span className="text-emerald">{a.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CSV Upload — click or drop */}
        <div className="max-w-2xl mx-auto">
          <div
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={handleClick}
            className="p-12 border-4 border-dashed border-gold/50 rounded-2xl text-center hover:border-gold cursor-pointer transition mb-10"
          >
            <p className="text-2xl text-gold font-bold">Click or Drop CSV Here</p>
            <p className="text-sky">Zerodha • Groww • TD • Interactive Brokers</p>
          </div>

          {/* Show holdings */}
          {holdings.length > 0 && (
            <div className="bg-gray-800/60 rounded-2xl p-6">
              <h3 className="text-xl text-gold mb-4">Holdings from CSV ({holdings.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {holdings.map((h: any, i) => (
                  <div key={i} className="bg-gray-700 p-4 rounded-lg">
                    {h.Ticker || h.Symbol || 'Unknown'} – {h.Quantity || h.Qty || '?'} × ${h.Price || '?'}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Smaller Pie Chart */}
        <div className="max-w-2xl mx-auto mt-16 bg-gray-800/60 backdrop-blur rounded-3xl p-8">
          <h2 className="text-2xl text-gold font-bold text-center mb-6">Portfolio Allocation</h2>
          <div className="w-80 mx-auto">
            <Pie data={data} options={options} />
          </div>
          <div className="text-center mt-6">
            <div className="text-4xl font-bold text-gold">$48,270 USD</div>
            <div className="text-emerald">+2.3 % today</div>
          </div>
        </div>

      </div>
    </main>
  )
}
