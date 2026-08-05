import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const API_KEY = process.env.MESHY_API_KEY
const BASE_URL = 'https://api.meshy.ai/openapi/v2/text-to-3d'
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'models')

// Preview only (no refine) = small geometry files, no heavy textures
const MODELS = [
  { name: 'tree-conifer', prompt: 'single very low poly pine tree, 3 stacked green cones for foliage, thin brown cylinder trunk, minimal geometry, game asset' },
  { name: 'tree-broadleaf', prompt: 'single very low poly round tree, one green sphere canopy, short thick brown cylinder trunk, minimal geometry, game asset' },
  { name: 'tree-palm', prompt: 'single very low poly palm tree, curved brown cylinder trunk, 4 flat green leaf planes at top, minimal geometry, game asset' },
]

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
}

async function createPreviewTask(prompt) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ mode: 'preview', prompt }),
  })
  const data = await res.json()
  if (!res.ok) { console.error('Create failed:', data); return null }
  return data.result
}

async function pollTask(taskId) {
  while (true) {
    const res = await fetch(`${BASE_URL}/${taskId}`, { headers })
    const data = await res.json()
    if (data.status === 'SUCCEEDED') return data
    if (data.status === 'FAILED') { console.error('Failed:', data.task_error?.message); return null }
    process.stdout.write(`\r  Progress: ${data.progress || 0}%`)
    await new Promise(r => setTimeout(r, 5000))
  }
}

async function main() {
  if (!API_KEY) { console.error('Missing MESHY_API_KEY'); process.exit(1) }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const model of MODELS) {
    console.log(`\n=== ${model.name} ===`)
    console.log(`  Prompt: "${model.prompt}"`)

    // Preview only - no refine step. Small files.
    const previewId = await createPreviewTask(model.prompt)
    if (!previewId) continue
    const preview = await pollTask(previewId)
    if (!preview) continue
    
    console.log('\n  Done! Downloading...')
    if (preview.model_urls?.glb) {
      const res = await fetch(preview.model_urls.glb)
      const buffer = await res.arrayBuffer()
      const filepath = path.join(OUTPUT_DIR, `${model.name}.glb`)
      fs.writeFileSync(filepath, Buffer.from(buffer))
      const sizeMB = (buffer.byteLength / 1024 / 1024).toFixed(2)
      console.log(`  Saved: ${filepath} (${sizeMB} MB)`)
    }
  }
  console.log('\nDone!')
}

main().catch(console.error)
