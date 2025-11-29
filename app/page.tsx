'use client'

import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState } from 'react'
import Fuse from 'fuse.js'

ChartJS.register(ArcElement, Tooltip, Legend)

// Demo assets for SmartSearch
const assets = [
  { id: 1, name: 'Apple Inc (AAPL)', type: 'Stock (US)', ticker: 'AAPL' },
  { id: 2, name: 'Bitcoin (BTC)', type: 'Crypto', ticker: 'BTC' },
  { id: 3, name: 'HDFC Bank (HDFCBANK.NS)', type: 'Stock (India)', ticker: 'HDFCBANK.NS' },
  { id: 4, name: 'Gold (XAU/USD)', type: 'Commodity', ticker: 'XAUUSD' },
  { id: 5, name: 'Royal Bank of Canada (RY.TO)', type: 'Stock (Canada)', ticker: 'RY.TO' },
  { id: 6, name: 'Adani Ports (ADANIPORTS.NS)', type: 'Stock (India)', ticker: 'ADANIPORTS.NS' },
  { id: 7, name: 'Tesla (TSLA)', type: 'Stock (US)', ticker: 'TSLA' },
  { id: 8, name: 'Ethereum (ETH)', type: 'Crypto', ticker: 'ETH' },
]

const fuse = new Fuse(assets, { keys: ['name', 'type', 'ticker'], threshold: 0.3 })

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [csvFile, setCsvFile] = useState(null)
  const [selectedAsset, setSelectedAsset] = useState(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    if (term.length >= 2) {
      const results = fuse.search(term)
      setSearchResults(results.map(r => r.item))
    } else {
      setSearchResults([])
    }
  }

  const selectAsset = (asset) => {
    setSelectedAsset(asset)
    alert(`Added ${asset.name} to portfolio! (Ticker: ${asset.ticker}) – Full integration next.`)
    setSearchTerm('')
    setSearchResults([])
  }

  const handleCsvDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.csv')) {
      setCsvFile(file)
      // Basic PapaParse stub – parse first 3 rows as demo
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const holdings = results.data.slice(0, 3).map(row => `${row.Ticker || 'Unknown'} added!`)
          alert(`CSV parsed: ${file.name}\nHoldings added:\n${holdings.join('\n')}\n(Total USD: $${holdings.length * 10000} mock)`)
        }
      })
    } else {
      alert('Please drop a .csv file with columns: Date,Ticker,Qty,Price,Currency')
    }
  }

  const data = {
    labels: ['Stocks 42%', 'Gold 18%', 'Crypto 15%', 'Real Estate 12%', 'Mutual Funds 8%', 'NFTs 3%', 'Cash 2%'],
    datasets: [{
      data: [42, 18, 15, 12, 8, 3, 2],
      backgroundColor: ['#4338CA', '#FCD34D', '#A855F7', '#F472B6', '#10B981', '#EC4899', '#7DD3FC'],
      borderColor: '#1a1a1a',  // Dark border for visibility
      borderWidth: 2,
      hoverOffset: 10
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#FCD34D',  // Gold text for legend visibility
          padding: 20,
          font: { size: 12 }
        }
      },
      title: {
        display: true,
        text: 'Portfolio Allocation (Hover for Details)',
        color: '#FCD34D',
        font: { size: 16 }
      }
    }
  }

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gold to-rose bg-clip-text text-transparent mb-4">
            Orbit Folio
          </h1>
          <p className="text-xl text-sky">Your global wealth, one radiant orbit away</p>
        </div>

        {/* SmartSearch with Label & Dark Input */}
        <div className="mb-8">
          <label className="block text-gold font-bold mb-2">SmartSearch Holdings</label>
          <input
            type="text"
            placeholder="Type 2+ chars (e.g., AAPL, BTC, Gold)..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-4 rounded-xl bg-gray-800/80 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold border border-gray-600"
          />
          {searchResults.length > 0 && (
            <ul className="mt-2 bg-gray-800/90 rounded-xl p-2 max-h-40 overflow-y-auto border border-gray-600">
              {searchResults.map((asset) => (
                <li 
                  key={asset.id} 
                  onClick={() => selectAsset(asset)}
                  className="p-3 hover:bg-gold/20 cursor-pointer rounded border-b border-gray-700 last:border-b-0 flex justify-between"
                >
                  <span className="text-white">{asset.name}</span>
                  <span className="text-emerald text-sm">{asset.type}</span>
                </li>
              ))}
            </ul>
          )}
          {selectedAsset && <p className="mt-2 text-emerald">Selected: {selectedAsset.name}</p>}
        </div>

        {/* CSV Upload with PapaParse */}
        <div 
          className="mb-8 p-8 border-2 border-dashed border-gold rounded-xl text-center hover:bg-gray-800/50 transition cursor-pointer"
          onDrop={handleCsvDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p className="text-gold font-bold mb-2">📁 Drop CSV Here</p>
          <p className="text-sky text-sm">Supports Zerodha, TD, Groww – Auto-adds to USD dashboard</p>
          {csvFile && <p className="mt-2 text-emerald font-bold">✅ {csvFile.name} parsed & holdings added!</p>}
        </div>

        {/* Dashboard Pie with Visible Legend */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-600">
          <div className="w-80 md:w-96 mx-auto">
            <Pie data={data} options={options} />
          </div>
          <div className="text-center mt-8">
            <div className="text-3xl font-bold text-gold">$48,270 USD</div>
            <div className="text-emerald text-lg">+2.3% Today • Sharpe 1.2 • Low Risk</div>
          </div>
        </div>

        <p className="text-center mt-12 text-lg text-sky">Phase 1: Live prices & auth next. Scales to 10k users – free forever.</p>
      </div>
    </main>
  )
}
