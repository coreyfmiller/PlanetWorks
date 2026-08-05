import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const API_KEY = process.env.MESHY_API_KEY
const BASE_URL = 'https://api.meshy.ai/openapi/v2/text-to-3d'
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'models')

const MODELS = [
  { name: 'tree-pine-dark', prompt: 'single low poly dark green pine tree with layered triangle foliage, brown bark trunk, forest green color, stylized game asset, vibrant colors' },
  { name: 'tree-pine-light', prompt: 'single low poly bright green spruce tree with pointed triangle foliage layers, light brown trunk, spring green color, stylized game asset, vibrant colors' },
  { name: 'tree-oak', prompt: 'single low poly oak tree with large round dark green canopy, thick brown trunk with visible bark, stylized game asset, vibrant colors' },
  { name: 'tree-birch', prompt: 'single low poly birch tree with small yellow-green round leaf clusters, thin white bark trunk, autumn colors, stylized game asset, vibrant colors' },
  { name: 'tree-palm-tropical', prompt: 'single low poly tropical coconut palm tree, curved tan trunk, bright green drooping fronds at top, stylized game asset, vibrant colors' },
]

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
}

async function createTask(prompt) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ mode: 'preview', prompt }),
  })
  const data = await res.json()
  if (!res.ok) { console.error('Create failed:', data); return null }
  return data.result
}

async function createRefineTask(previewTaskId) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ mode: 'refine', preview_task_id: previewTaskId }),
  })
  const data = await res.json()
  if (!res.ok) { console.error('Refine failed:', data); return null }
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

    // Preview
    console.log('  Geometry...')
    const previewId = await createTask(model.prompt)
    if (!previewId) continue
    const preview = await pollTask(previewId)
    if (!preview) continue
    console.log('\n  Done! Refining...')

    // Refine for color/texture
    const refineId = await createRefineTask(previewId)
    if (!refineId) {
      // Fallback to preview
      if (preview.model_urls?.glb) {
        const res = await fetch(preview.model_urls.glb)
        fs.writeFileSync(path.join(OUTPUT_DIR, `${model.name}.glb`), Buffer.from(await res.arrayBuffer()))
        console.log('  Saved (preview only)')
      }
      continue
    }
    const result = await pollTask(refineId)
    if (!result || !result.model_urls?.glb) {
      console.error('  Refine failed, using preview')
      if (preview.model_urls?.glb) {
        const res = await fetch(preview.model_urls.glb)
        fs.writeFileSync(path.join(OUTPUT_DIR, `${model.name}.glb`), Buffer.from(await res.arrayBuffer()))
      }
      continue
    }
    console.log('\n  Textured! Downloading...')
    const res = await fetch(result.model_urls.glb)
    const buf = await res.arrayBuffer()
    fs.writeFileSync(path.join(OUTPUT_DIR, `${model.name}.glb`), Buffer.from(buf))
    console.log(`  Saved: ${model.name}.glb (${(buf.byteLength/1024/1024).toFixed(1)}MB)`)
  }
  console.log('\nDone!')
}

main().catch(console.error)
