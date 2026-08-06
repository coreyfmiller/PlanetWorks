import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const API_KEY = process.env.MESHY_API_KEY
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'models')
const RIG_TASK_ID = '019fd297-b6b6-76f7-9ba7-7ca1ba05ee76' // from our successful rigging

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

async function generateAnimation(actionId, name, filename) {
  console.log(`\n=== Generating: ${name} (action_id: ${actionId}) ===`)
  const res = await fetch('https://api.meshy.ai/openapi/v1/animations', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      rig_task_id: RIG_TASK_ID,
      action_id: actionId,
    }),
  })
  const data = await res.json()
  if (!res.ok) { console.error(`  Failed to create task:`, data); return null }
  const taskId = data.result
  console.log(`  Task ID: ${taskId}`)

  const result = await pollTask(`https://api.meshy.ai/openapi/v1/animations/${taskId}`)
  if (!result) return null
  console.log(`\n  Done!`)

  // Download the GLB
  if (result.result?.glb_url) {
    await downloadFile(result.result.glb_url, filename)
  } else if (result.model_urls?.glb) {
    await downloadFile(result.model_urls.glb, filename)
  } else {
    console.log('  Result keys:', JSON.stringify(result.result ? Object.keys(result.result) : Object.keys(result)))
    // Try to find any URL
    const resultStr = JSON.stringify(result)
    const urlMatch = resultStr.match(/(https:\/\/[^"]+\.glb[^"]*)/i)
    if (urlMatch) {
      console.log('  Found GLB URL:', urlMatch[1].slice(0, 80) + '...')
      await downloadFile(urlMatch[1], filename)
    }
  }
  return result
}

async function main() {
  if (!API_KEY) { console.error('Missing key'); process.exit(1) }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  // Generate sitting idle animation (for boat)
  await generateAnimation(33, 'Chair Sit Idle Male', 'character-cartoon-sitting.glb')

  console.log('\n=== All done! ===')
}

main().catch(console.error)
