import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const API_KEY = process.env.MESHY_API_KEY
const BASE_URL = 'https://api.meshy.ai/openapi/v2/text-to-3d'
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'models')

// 5 tree variants: 2 conifer, 2 broadleaf, 1 palm
const MODELS = [
  { name: 'tree-pine-dark', prompt: 'single dark green pine tree, triangular layered foliage, brown trunk, low poly stylized, vibrant forest green color, game asset' },
  { name: 'tree-pine-light', prompt: 'single bright spring green spruce tree, pointed conical shape, light brown trunk, low poly stylized, vibrant light green, game asset' },
  { name: 'tree-oak-green', prompt: 'single large oak tree with round dark green canopy, thick brown trunk, low poly stylized, rich green foliage, game asset' },
  { name: 'tree-birch-yellow', prompt: 'single birch tree with golden yellow-green small leaf clusters, thin white trunk, low poly stylized, autumn colors, game asset' },
  { name: 'tree-palm-green', prompt: 'single tropical palm tree, curved brown trunk, bright green drooping fronds, low poly stylized, vibrant tropical green, game asset' },
]

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
}

async function createTask(prompt) {
  const res = await fetch(BASE_URL, { method: 'POST', headers, body: JSON.stringify({ mode: 'preview', prompt }) })
  const data = await res.json()
  if (!res.ok) { console.error('Failed:', data); return null }
  return data.result
}

async function pollTask(taskId) {
  while (true) {
    const res = await fetch(`${BASE_URL}/${taskId}`, { headers })
    const data = await res.json()
    if (data.status === 'SUCCEEDED') return data
    if (data.status === 'FAILED') { console.error('Failed:', data.task_error?.message); return null }
    process.stdout.write(`\r  ${data.progress || 0}%`)
    await new Promise(r => setTimeout(r, 5000))
  }
}

async function main() {
  if (!API_KEY) { console.error('Missing key'); process.exit(1) }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const model of MODELS) {
    console.log(`\n=== ${model.name} ===`)
    const id = await createTask(model.prompt)
    if (!id) continue
    const result = await pollTask(id)
    if (!result?.model_urls?.glb) continue
    const res = await fetch(result.model_urls.glb)
    const buf = await res.arrayBuffer()
    fs.writeFileSync(path.join(OUTPUT_DIR, `${model.name}.glb`), Buffer.from(buf))
    console.log(`\n  Saved: ${model.name}.glb (${(buf.byteLength/1024/1024).toFixed(1)}MB)`)
  }
  console.log('\nDone!')
}

main().catch(console.error)
