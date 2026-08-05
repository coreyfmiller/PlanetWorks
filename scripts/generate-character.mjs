import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const API_KEY = process.env.MESHY_API_KEY
const BASE_URL = 'https://api.meshy.ai/openapi/v2/text-to-3d'
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'models')

const MODELS = [
  { name: 'character-fisherman', prompt: 'low poly male character standing upright, torn dirty linen shirt, rolled up brown pants, bare feet, messy sun-bleached hair, tanned weathered skin, rugged castaway fisherman, stylized game asset, full body, T-pose' },
]

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
}

async function createPreviewTask(prompt) {
  const res = await fetch(BASE_URL, { method: 'POST', headers, body: JSON.stringify({ mode: 'preview', prompt }) })
  const data = await res.json()
  if (!res.ok) { console.error('Create failed:', data); return null }
  return data.result
}

async function createRefineTask(previewTaskId) {
  const res = await fetch(BASE_URL, { method: 'POST', headers, body: JSON.stringify({ mode: 'refine', preview_task_id: previewTaskId }) })
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
    process.stdout.write(`\r  ${data.progress || 0}%`)
    await new Promise(r => setTimeout(r, 5000))
  }
}

async function main() {
  if (!API_KEY) { console.error('Missing key'); process.exit(1) }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const model of MODELS) {
    console.log(`\n=== ${model.name} ===`)
    console.log(`  Prompt: "${model.prompt}"`)

    console.log('  Step 1: Geometry...')
    const previewId = await createPreviewTask(model.prompt)
    if (!previewId) continue
    const preview = await pollTask(previewId)
    if (!preview) continue
    console.log('\n  Geometry done!')

    console.log('  Step 2: Textures...')
    const refineId = await createRefineTask(previewId)
    if (!refineId) {
      if (preview.model_urls?.glb) {
        const res = await fetch(preview.model_urls.glb)
        fs.writeFileSync(path.join(OUTPUT_DIR, `${model.name}.glb`), Buffer.from(await res.arrayBuffer()))
        console.log('  Saved (preview only)')
      }
      continue
    }
    const result = await pollTask(refineId)
    if (!result || !result.model_urls?.glb) {
      console.error('  Refine failed')
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
