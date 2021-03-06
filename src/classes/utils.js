/**
 *
 * @param {String} url - URL to be fetched
 * @returns {Promise<any>}
 */
export async function getURL (url) {
  let response = await fetch(url)
  return response.json()
}

export function random (factor) {
  return Math.random() * factor
}