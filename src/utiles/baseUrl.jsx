import { create } from 'apisauce'
export const api = create({
    baseURL: 'https://webzards.com/vietq/api/',
    headers: { Accept: 'application/vnd.github.v3+json' ,'Content-Type':'application/json'},
  })

  export const apiGeodecode=create({
    baseURL: 'https://nominatim.openstreetmap.org',
    headers: { Accept: 'application/vnd.github.v3+json' ,'Content-Type':'application/json'},
  })

  export const urlImg="https://webzards.com/vietq/images";