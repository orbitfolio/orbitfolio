'use client'

import Papa from 'papaparse'          // ← THIS LINE WAS MISSING ←
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState } from 'react'
import Fuse from 'fuse.js'
