export async function getURL (url) {
  let response = await fetch(url)
  return await response.json()
}

export function random (factor) {
  return Math.random() * factor
}