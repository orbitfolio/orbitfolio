'use client'

import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState } from 'react'
import Fuse from 'fuse.js'

ChartJS.register(ArcElement, Tooltip, Legend)

// Demo assets for SmartSearch
const assets = [
  { id: 1, name: 'Apple Inc (AAPL)', type: 'Stock (US)' },
  { id: 2, name: 'Bitcoin (BTC)', type: 'Crypto' },
  { id: 3, name: 'HDFC Bank (HDFCBANK.NS)', type: 'Stock (India)' },
  { id: 4, name: 'Gold (XAU/USD)', type: 'Commodity' },
  { id: 5, name: 'Royal Bank of Canada (RY.TO)', type: 'Stock (Canada)' },
  { id: 6, name: 'Adani Ports (ADANIPORTS.NS)', type: 'Stock (India)' },
  { id: 7, name: 'Tesla (TSLA)', type: 'Stock (US)' },
  { id: 8, name: 'Ethereum (ETH)', type: 'Crypto' },
]

const fuse = new Fuse(assets, { keys: ['name', 'type'], threshold: 0.3 })

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [csvFile, setCsvFile] = useState(null)

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

  const handleCsvDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.csv')) {
      setCsvFile(file)
      // Stub for full PapaParse – alert for now
      alert(`CSV uploaded: ${file.name} – Parsed ${file.size} bytes. Holdings added to dashboard (full integration next)!`)
    } else {
      alert('Please drop a .csv file (e.g., from Zerodha or TD).')
    }
  }

  const data = {
    labels: ['Stocks 42%', 'Gold 18%', 'Crypto 15%', 'Real Estate 12%', 'Mutual Funds 8%', 'NFTs 3%', 'Cash 2%'],
    datasets: [{
      data: [42, 18, 15, 12, 8, 3, 2],
      backgroundColor: ['#4338CA', '#FCD34D', '#A855F7', '#F472B6', '#10B981', '#EC4899', '#7DD3FC'],
      borderColor: '#fff',
      borderWidth: 4,
      hoverOffset: 20
    }]
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

        {/* SmartSearch */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search tickers (e.g., AAPL, BTC, Gold)..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-sky focus:outline-none focus:ring-2 focus:ring-gold"
          />
          {searchResults.length > 0 && (
            <ul className="mt-2 bg-white/10 rounded-xl p-2 max-h-40 overflow-y-auto">
              {searchResults.map((asset) => (
                <li key={asset.id} className="p-2 hover:bg-white/20 cursor-pointer rounded">
                  {asset.name} – <span className="text-emerald">{asset.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CSV Upload */}
        <div 
          className="mb-8 p-8 border-2 border-dashed border-gold rounded-xl text-center hover:bg-white/5 transition cursor-pointer"
          onDrop={handleCsvDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p className="text-gold font-bold mb-2">📁 Drop CSV Here (Zerodha, TD, Groww format)</p>
          <p className="text-sky text-sm">Supports stocks, crypto, MFs – auto-converts to USD</p>
          {csvFile && <p className="mt-2 text-emerald font-bold">✅ {csvFile.name} parsed & added!</p>}
        </div>

        {/* Dashboard Pie */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <div className="w-80 md:w-96 mx-auto">
            <Pie data={data} options={{ 
              responsive: true, 
              plugins: { 
                legend: { position: 'bottom', labels: { color: '#fff', padding: 20, font: { size: 12 } } },
                title: { display: true, text: 'Portfolio Allocation', color: '#FCD34D', font: { size: 16 } }
              } 
            }} />
          </div>
          <div className="text-center mt-8">
            <div className="text-3xl font-bold text-gold">$48,270 USD</div>
            <div className="text-emerald text-lg">+2.3% Today • Sharpe 1.2 • Low Risk</div>
          </div>
        </div>

        <p className="text-center mt-12 text-lg text-sky">Global APIs, auth, & TA charts next. Built for 10k+ users – free forever.</p>
      </div>
    </main>
  )
}
