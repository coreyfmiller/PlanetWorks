import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const API_KEY = process.env.MESHY_API_KEY
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'models')

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
}

async function pollTask(url) {
  while (true) {
    const res = await fetch(url, { headers })
    const data = await res.json()
    if (data.status === 'SUCCEEDED') return data
    if (data.status === 'FAILED') { console.error('Failed:', data.task_error?.message); return null }
    process.stdout.write(`\r  ${data.status} ${data.progress || 0}%`)
    await new Promise(r => setTimeout(r, 5000))
  }
}

async function downloadFile(url, filename) {
  const res = await fetch(url)
  const buf = await res.arrayBuffer()
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), Buffer.from(buf))
  console.log(`  Saved: ${filename} (${(buf.byteLength/1024/1024).toFixed(1)}MB)`)
}

async function main() {
  if (!API_KEY) { console.error('Missing key'); process.exit(1) }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  console.log('=== Generating Treasure Chest (Text to 3D, lowpoly) ===')
  
  // Step 1: Preview (mesh generation)
  const previewRes = await fetch('https://api.meshy.ai/openapi/v2/text-to-3d', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      mode: 'preview',
      prompt: 'Low-poly pirate treasure chest, wooden with iron bands, gold coins spilling out, slightly open lid, small padlock, cartoon game style',
      model_type: 'lowpoly',
    }),
  })
  const previewData = await previewRes.json()
  if (!previewRes.ok) { console.error('Preview failed:', previewData); return }
  const previewTaskId = previewData.result
  console.log('  Preview Task ID:', previewTaskId)

  const previewResult = await pollTask(`https://api.meshy.ai/openapi/v2/text-to-3d/${previewTaskId}`)
  if (!previewResult) return
  console.log('\n  Preview done!')

  // Step 2: Refine (texture)
  console.log('\n=== Texturing ===')
  const refineRes = await fetch('https://api.meshy.ai/openapi/v2/text-to-3d', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      mode: 'refine',
      preview_task_id: previewTaskId,
    }),
  })
  const refineData = await refineRes.json()
  if (!refineRes.ok) { console.error('Refine failed:', refineData); return }
  const refineTaskId = refineData.result
  console.log('  Refine Task ID:', refineTaskId)

  const refineResult = await pollTask(`https://api.meshy.ai/openapi/v2/text-to-3d/${refineTaskId}`)
  if (!refineResult) return
  console.log('\n  Textured!')

  // Download
  if (refineResult.model_urls?.glb) {
    await downloadFile(refineResult.model_urls.glb, 'treasure-chest.glb')
  }

  console.log('\n=== Done! ===')
  console.log('Task IDs:', { preview: previewTaskId, refine: refineTaskId })
}

main().catch(console.error)
