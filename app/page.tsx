'use client'

import Papa from 'papaparse'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState } from 'react'
import Fuse from 'fuse.js'

ChartJS.register(ArcElement, Tooltip, Legend)

// Demo assets
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

  const selectAsset = (asset: any) => {
    setSelectedAsset(asset)
    alert(`Added ${asset.name} to your portfolio!`)
    setSearchTerm('')
    setSearchResults([])
  }

  const handleCsvDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.csv')) {
      setCsvFile(file)
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const sample = results.data.slice(0, 3)
          alert(`CSV parsed successfully!\n\nSample rows:\n${sample.map((r: any) => JSON.stringify(r)).join('\n')}`)
        }
      })
    }
  }

  const data = {
    labels: ['Stocks 42%', 'Gold 18%', 'Crypto 15%', 'Real Estate 12%', 'Mutual Funds 8%', 'NFTs 3%', 'Cash 2%'],
    datasets: [{
      data: [42, 18, 15, 12, 8, 3, 2],
      backgroundColor: ['#4338CA', '#FCD34D', '#A855F7', '#F472B6', '#10B981', '#EC4899', '#7DD3FC'],
      borderColor: '#1a1a1a',
      borderWidth: 2,
      hoverOffset: 10
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: '#FCD34D', padding: 20 } },
      title: { display: true, text: 'Portfolio Allocation', color: '#FCD34D' }
    }
  }

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-indigo-950 via-purple-950 to-rose-950">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gold to-rose bg-clip-text text-transparent mb-4">
          Orbit Folio
        </h1>
        <p className="text-xl text-sky mb-12">Your global wealth, one radiant orbit away</p>

        <div className="space-y-8">
          {/* SmartSearch */}
          <div>
            <label className="block text-gold font-bold mb-2 text-left">SmartSearch Holdings</label>
            <input
              type="text"
              placeholder="Type 2+ chars (AAPL, BTC, Gold...)"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-gold border border-gray-700"
            />
            {searchResults.length > 0 && (
              <ul className="mt-2 bg-gray-800 rounded-xl border border-gray-700 max-h-48 overflow-y-auto">
                {searchResults.map((asset: any) => (
                  <li
                    key={asset.id}
                    onClick={() => selectAsset(asset)}
                    className="p-3 hover:bg-gold/20 cursor-pointer flex justify-between border-b border-gray-700 last:border-0"
                  >
                    <span className="text-white">{asset.name}span>
                    <span className="text-emerald text-sm">{asset.type}span>
                  li>
                ))}
              ul>
            )}
          div>

          {/* CSV Dropzone */}
          <div
            onDrop={handleCsvDrop}
            onDragOver={(e) => e.preventDefault()}
            className="p-10 border-4 border-dashed border-gold/50 rounded-2xl hover:border-gold transition"
          >
            <p className="text-gold text-2xl font-bold">Drop CSV Herep>
            <p className="text-sky mt-2">Zerodha • Groww • TD • Interactive Brokersp>
          div>

          {/* Pie Chart */}
          <div className="bg-gray-800/60 backdrop-blur rounded-3xl p-8">
            <div className="w-80 md:w-96 mx-auto">
              <Pie data={data} options={options} />
            div>
            <div className="text-4xl font-bold text-gold mt-6">$48,270 USDdiv>
            <div className="text-emerald">+2.3 % todaydiv>
          div>
        div>
      div>
    main>
  )
}
