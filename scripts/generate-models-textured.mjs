import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const API_KEY = process.env.MESHY_API_KEY
const BASE_URL = 'https://api.meshy.ai/openapi/v2/text-to-3d'
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'models')

const MODELS = [
  { name: 'boat-basic', prompt: 'small wooden rowboat, weathered oak planks, one patched cloth sail, rope details, realistic textures, game asset' },
  { name: 'boat-canvas', prompt: 'wooden sailboat with varnished mahogany hull, two white canvas sails, brass fittings, small cabin, realistic textures, game asset' },
  { name: 'boat-racing', prompt: 'sleek racing yacht, dark blue fiberglass hull with red waterline stripe, tall white dacron sails, polished teak deck, realistic textures, game asset' },
  { name: 'boat-motor', prompt: 'modern white fiberglass motorboat, tinted windshield, chrome outboard motor, navy blue hull bottom, wooden deck, realistic textures, game asset' },
  { name: 'airplane', prompt: 'vintage red biplane, wooden propeller, fabric covered wings, brass fittings, leather cockpit, realistic textures, game asset' },
  { name: 'pirate-ship', prompt: 'pirate ship with dark weathered wood hull, torn black sails, skull and crossbones flag, cannon ports, rope rigging, realistic textures, game asset' },
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
  if (!res.ok) {
    console.error('Create preview task failed:', data)
    return null
  }
  return data.result
}

async function createRefineTask(previewTaskId) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ mode: 'refine', preview_task_id: previewTaskId }),
  })
  const data = await res.json()
  if (!res.ok) {
    console.error('Create refine task failed:', data)
    return null
  }
  return data.result
}

async function pollTask(taskId) {
  while (true) {
    const res = await fetch(`${BASE_URL}/${taskId}`, { headers })
    const data = await res.json()
    
    if (data.status === 'SUCCEEDED') {
      return data
    }
    if (data.status === 'FAILED') {
      console.error('Task failed:', data.task_error?.message)
      return null
    }
    
    const progress = data.progress || 0
    process.stdout.write(`\r  Progress: ${progress}%`)
    await new Promise(r => setTimeout(r, 5000))
  }
}

async function downloadGlb(url, filename) {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  const filepath = path.join(OUTPUT_DIR, `${filename}.glb`)
  fs.writeFileSync(filepath, Buffer.from(buffer))
  console.log(`  Saved: ${filepath}`)
}

async function main() {
  if (!API_KEY) {
    console.error('Missing MESHY_API_KEY in .env.local')
    process.exit(1)
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const model of MODELS) {
    console.log(`\n=== ${model.name} ===`)
    console.log(`  Prompt: "${model.prompt}"`)
    
    // Step 1: Preview (geometry)
    console.log('  Step 1: Generating geometry...')
    const previewId = await createPreviewTask(model.prompt)
    if (!previewId) {
      console.error(`  Failed to create preview for ${model.name}`)
      continue
    }
    console.log(`  Preview Task ID: ${previewId}`)
    
    const previewResult = await pollTask(previewId)
    if (!previewResult) {
      console.error(`  Preview failed for ${model.name}`)
      continue
    }
    console.log(`\n  Geometry done!`)
    
    // Step 2: Refine (textures)
    console.log('  Step 2: Adding textures...')
    const refineId = await createRefineTask(previewId)
    if (!refineId) {
      console.error(`  Failed to create refine for ${model.name}`)
      // Fall back to preview GLB
      if (previewResult.model_urls?.glb) {
        await downloadGlb(previewResult.model_urls.glb, model.name)
      }
      continue
    }
    console.log(`  Refine Task ID: ${refineId}`)
    
    const refineResult = await pollTask(refineId)
    if (!refineResult) {
      console.error(`  Refine failed for ${model.name}, using preview`)
      if (previewResult.model_urls?.glb) {
        await downloadGlb(previewResult.model_urls.glb, model.name)
      }
      continue
    }
    
    console.log(`\n  Textured! Downloading GLB...`)
    if (refineResult.model_urls?.glb) {
      await downloadGlb(refineResult.model_urls.glb, model.name)
    } else {
      console.error(`  No GLB URL for ${model.name}`)
    }
  }
  
  console.log('\n\nDone! Textured models saved to public/models/')
}

main().catch(console.error)
