import axios, { AxiosResponse } from 'axios'

interface ItemsResponse {
  items: Item[]
}

export default class Item {
  static async fetchList (storeId: number) {
    if (!storeId) return
    const endpoint = `https://aluminum-318311.uw.r.appspot.com/api/stores/${storeId}`
    const res: any = await axios.get(endpoint)
    return res.data.store.items
  }

  image?: any
  image_url?: string
}
