#!/usr/bin/env node
// generate-icons.mjs — run once to create placeholder icons
import { createCanvas } from 'canvas'
import { writeFileSync, mkdirSync } from 'fs'

function makeIcon(size) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#1D2B45'
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = '#C0392B'
  const r = size * 0.35, cx = size / 2, cy = size / 2, t = size * 0.08
  ctx.fillRect(cx - t / 2, cy - r, t, r * 2)
  ctx.fillRect(cx - r, cy - t / 2, r * 2, t)
  return canvas.toBuffer('image/png')
}

mkdirSync('public/icons', { recursive: true })
writeFileSync('public/icons/icon-192.png', makeIcon(192))
writeFileSync('public/icons/icon-512.png', makeIcon(512))
console.log('Icons generated!')
