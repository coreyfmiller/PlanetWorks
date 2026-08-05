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

  // Check if we can skip image-to-3d (already done)
  const existingTaskId = process.argv[2] // pass task ID as arg to skip step 1
  let imgTaskId = existingTaskId

  if (!imgTaskId) {
    // Step 1: Image to 3D
    console.log('=== Step 1: Image to 3D ===')
    const imgRes = await fetch('https://api.meshy.ai/openapi/v1/image-to-3d', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        image_url: 'https://i.imgur.com/ayTPQ5r.png',
        should_texture: true,
      }),
    })
    const imgData = await imgRes.json()
    if (!imgRes.ok) { console.error('Image-to-3D failed:', imgData); return }
    imgTaskId = imgData.result
    console.log('  Task ID:', imgTaskId)

    const imgResult = await pollTask(`https://api.meshy.ai/openapi/v1/image-to-3d/${imgTaskId}`)
    if (!imgResult) return
    console.log('\n  Model generated!')

    // Save the base model
    if (imgResult.model_urls?.glb) {
      await downloadFile(imgResult.model_urls.glb, 'character-cartoon.glb')
    }
  } else {
    console.log(`=== Skipping Step 1 (using existing task: ${imgTaskId}) ===`)
  }

  // Step 1.5: Remesh to reduce face count (rigging limit is 300K faces)
  console.log('\n=== Step 1.5: Remesh (reduce faces for rigging) ===')
  const remeshRes = await fetch('https://api.meshy.ai/openapi/v1/remesh', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      input_task_id: imgTaskId,
      target_polycount: 50000, // low-poly for game use
      topology: 'triangle',
    }),
  })
  const remeshData = await remeshRes.json()
  if (!remeshRes.ok) { console.error('Remesh failed:', remeshData); return }
  const remeshTaskId = remeshData.result
  console.log('  Remesh Task ID:', remeshTaskId)

  const remeshResult = await pollTask(`https://api.meshy.ai/openapi/v1/remesh/${remeshTaskId}`)
  if (!remeshResult) return
  console.log('\n  Remeshed!')

  // Save remeshed model
  if (remeshResult.model_urls?.glb) {
    await downloadFile(remeshResult.model_urls.glb, 'character-cartoon-lowpoly.glb')
  }

  // Step 2: Rig the remeshed character
  console.log('\n=== Step 2: Rigging ===')
  const rigRes = await fetch('https://api.meshy.ai/openapi/v1/rigging', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      input_task_id: remeshTaskId,
    }),
  })
  const rigData = await rigRes.json()
  if (!rigRes.ok) { console.error('Rig failed:', rigData); return }
  const rigTaskId = rigData.result
  console.log('  Rig Task ID:', rigTaskId)

  const rigResult = await pollTask(`https://api.meshy.ai/openapi/v1/rigging/${rigTaskId}`)
  if (!rigResult) return
  console.log('\n  Rigged!')
  console.log('  Result keys:', Object.keys(rigResult.result || {}))

  // Save rigged model (response has result.rigged_character_glb_url)
  if (rigResult.result?.rigged_character_glb_url) {
    await downloadFile(rigResult.result.rigged_character_glb_url, 'character-cartoon-rigged.glb')
  }

  // Rigging includes basic walking/running animations automatically
  if (rigResult.result?.basic_animations?.walking_glb_url) {
    await downloadFile(rigResult.result.basic_animations.walking_glb_url, 'character-cartoon-walking.glb')
    console.log('  Walking animation included from rigging!')
  }
  if (rigResult.result?.basic_animations?.running_glb_url) {
    await downloadFile(rigResult.result.basic_animations.running_glb_url, 'character-cartoon-running.glb')
    console.log('  Running animation included from rigging!')
  }

  console.log('\nDone! Full pipeline complete.')
  console.log('\nFiles saved:')
  console.log('  - character-cartoon.glb (base model)')
  console.log('  - character-cartoon-rigged.glb (with skeleton)')
  console.log('  - character-cartoon-walking.glb (walk animation)')
  console.log('  - character-cartoon-running.glb (run animation)')
}

main().catch(console.error)
