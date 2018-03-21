export default class Request {
  static async getURL (url) {
    let response = await fetch(url)
    return await response.json()
  }
}