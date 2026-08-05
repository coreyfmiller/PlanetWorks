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

  // Step 1: Image to 3D with A-pose for rigging + lowpoly for game
  console.log('=== Step 1: Image to 3D (lowpoly, A-pose for rigging) ===')
  const imgRes = await fetch('https://api.meshy.ai/openapi/v1/image-to-3d', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      image_url: 'https://i.imgur.com/jxUNgKX.png',
      should_texture: true,
      model_type: 'lowpoly',
      pose_mode: 'a-pose',
    }),
  })
  const imgData = await imgRes.json()
  if (!imgRes.ok) { console.error('Image-to-3D failed:', imgData); return }
  const imgTaskId = imgData.result
  console.log('  Task ID:', imgTaskId)

  const imgResult = await pollTask(`https://api.meshy.ai/openapi/v1/image-to-3d/${imgTaskId}`)
  if (!imgResult) return
  console.log('\n  Model generated!')

  // Save the base model
  if (imgResult.model_urls?.glb) {
    await downloadFile(imgResult.model_urls.glb, 'character-cartoon.glb')
  }

  // Step 2: Rig the character
  console.log('\n=== Step 2: Rigging ===')
  const rigRes = await fetch('https://api.meshy.ai/openapi/v1/rigging', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      input_task_id: imgTaskId,
      height_meters: 1.5, // shorter cartoony character
    }),
  })
  const rigData = await rigRes.json()
  if (!rigRes.ok) { console.error('Rig failed:', rigData); return }
  const rigTaskId = rigData.result
  console.log('  Rig Task ID:', rigTaskId)

  const rigResult = await pollTask(`https://api.meshy.ai/openapi/v1/rigging/${rigTaskId}`)
  if (!rigResult) return
  console.log('\n  Rigged!')
  console.log('  Result keys:', JSON.stringify(Object.keys(rigResult.result || {})))

  // Save rigged model
  if (rigResult.result?.rigged_character_glb_url) {
    await downloadFile(rigResult.result.rigged_character_glb_url, 'character-cartoon-rigged.glb')
  }

  // Rigging includes basic walking/running animations automatically
  if (rigResult.result?.basic_animations?.walking_glb_url) {
    await downloadFile(rigResult.result.basic_animations.walking_glb_url, 'character-cartoon-walking.glb')
    console.log('  Walking animation included!')
  }
  if (rigResult.result?.basic_animations?.running_glb_url) {
    await downloadFile(rigResult.result.basic_animations.running_glb_url, 'character-cartoon-running.glb')
    console.log('  Running animation included!')
  }

  console.log('\n=== DONE ===')
  console.log('Task IDs for reference:')
  console.log('  Image-to-3D:', imgTaskId)
  console.log('  Rigging:', rigTaskId)
  console.log('\nFiles saved in public/models/:')
  console.log('  - character-cartoon.glb (base lowpoly model)')
  console.log('  - character-cartoon-rigged.glb (with skeleton)')
  console.log('  - character-cartoon-walking.glb (walk animation)')
  console.log('  - character-cartoon-running.glb (run animation)')
}

main().catch(console.error)
