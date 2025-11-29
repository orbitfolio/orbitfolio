'use client'

import Papa from 'papaparse'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState } from 'react'
import Fuse from 'fuse.js'

ChartJS.register(ArcElement, Tooltip, Legend)

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
  const [results, setResults] = useState<any[]>([])
  const [csvFile, setCsvFile] = useState<File | null>(null)

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

  const addAsset = (asset: any) => {
    alert(`Added to portfolio: ${asset.name}`)
    setSearchTerm('')
    setResults([])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.csv')) {
      setCsvFile(file)
      Papa.parse(file, {
        header: true,
        complete: (res) => {
          alert(`CSV parsed!\n${res.data.slice(0, 3).map((r: any) => JSON.stringify(r)).join('\n')}`)
        }
      })
    }
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
      legend: { position: 'bottom' as const, labels: { color: '#FCD34D', padding: 20 } }
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-indigo-950 via-purple-950 to-rose-950 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gold to-rose bg-clip-text text-transparent mb-4">
          Orbit Folio
        </h1>
        <p className="text-xl text-sky mb-12">Your global wealth, one radiant orbit away</p>

        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search AAPL, BTC, Gold..."
            className="w-full max-w-xl p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          {results.length > 0 && (
            <ul className="mt-3 bg-gray-800 rounded-xl border border-gray-700 max-h-60 overflow-auto">
              {results.map(asset => (
                <li
                  key={asset.id}
                  onClick={() => addAsset(asset)}
                  className="p-4 hover:bg-gold/20 cursor-pointer flex justify-between"
                >
                  <span>{asset.name}</span>
                  <span className="text-emerald">{asset.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CSV Drop */}
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="p-12 border-4 border-dashed border-gold/50 rounded-2xl mb-12 hover:border-gold transition"
        >
          <p className="text-2xl text-gold font-bold">Drop CSV Here</p>
          <p className="text-sky">Zerodha • Groww • TD • Interactive Brokers</p>
        </div>

        {/* Pie */}
        <div className="bg-gray-800/60 backdrop-blur rounded-3xl p-10">
          <Pie data={data} options={options} />
          <div className="mt-8 text-4xl font-bold text-gold">$48,270 USD</div>
          <div className="text-emerald text-xl">+2.3 % today</div>
        </div>
      </div>
    </main>
  )
}
