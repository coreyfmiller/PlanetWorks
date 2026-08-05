import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const API_KEY = process.env.MESHY_API_KEY
const BASE_URL = 'https://api.meshy.ai/openapi/v2/text-to-3d'
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'models')

const MODELS = [
  { name: 'boat-basic', prompt: 'tiny low poly wooden rowboat with one small patched cloth sail, brown wood planks, flat shading, game asset, isometric view' },
  { name: 'boat-canvas', prompt: 'tiny low poly sailboat with two white canvas sails, small wooden cabin, dark brown hull, flat shading, game asset, isometric view' },
  { name: 'boat-racing', prompt: 'tiny low poly racing yacht with tall white sails, sleek dark blue hull with red racing stripe, flat shading, game asset, isometric view' },
  { name: 'boat-motor', prompt: 'tiny low poly white fiberglass motorboat with enclosed cabin, outboard motor, no sails, blue hull bottom, flat shading, game asset, isometric view' },
  { name: 'airplane', prompt: 'tiny low poly red biplane with two stacked wings, spinning propeller, white wing struts, flat shading, game asset, isometric view' },
  { name: 'pirate-ship', prompt: 'tiny low poly pirate ship with black hull, torn black sails, skull and crossbones, red trim, flat shading, game asset, isometric view' },
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
  if (!res.ok) {
    console.error('Create task failed:', data)
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
    console.log(`\nGenerating: ${model.name}`)
    console.log(`  Prompt: "${model.prompt}"`)
    
    const taskId = await createTask(model.prompt)
    if (!taskId) {
      console.error(`  Failed to create task for ${model.name}`)
      continue
    }
    console.log(`  Task ID: ${taskId}`)
    
    const result = await pollTask(taskId)
    if (!result) {
      console.error(`  Failed to generate ${model.name}`)
      continue
    }
    
    console.log(`\n  Completed! Downloading GLB...`)
    if (result.model_urls?.glb) {
      await downloadGlb(result.model_urls.glb, model.name)
    } else {
      console.error(`  No GLB URL available for ${model.name}`)
      console.log('  Available URLs:', JSON.stringify(result.model_urls, null, 2))
    }
  }
  
  console.log('\nDone! Models saved to public/models/')
}

main().catch(console.error)
