const icons = {
  clear: new URL('../../assets/images/icon-sunny.webp', import.meta.url).href,
  partly: new URL('../../assets/images/icon-partly-cloudy.webp', import.meta.url).href,
  overcast: new URL('../../assets/images/icon-overcast.webp', import.meta.url).href,
  drizzle: new URL('../../assets/images/icon-drizzle.webp', import.meta.url).href,
  rain: new URL('../../assets/images/icon-rain.webp', import.meta.url).href,
  snow: new URL('../../assets/images/icon-snow.webp', import.meta.url).href,
  storm: new URL('../../assets/images/icon-storm.webp', import.meta.url).href,
  fog: new URL('../../assets/images/icon-fog.webp', import.meta.url).href,
}

export function weatherCodeToIcon(code) {
  if (code === 0) return icons.clear
  if (code === 1 || code === 2) return icons.partly
  if (code === 3) return icons.overcast
  if (code === 45 || code === 48) return icons.fog
  if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) return icons.drizzle
  if (code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) return icons.rain
  if (code === 66 || code === 67 || code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) return icons.snow
  if (code === 95 || code === 96 || code === 99) return icons.storm
  return icons.partly
}

export const backgroundTodayLarge = new URL('../../assets/images/bg-today-large.svg', import.meta.url).href
export const backgroundTodaySmall = new URL('../../assets/images/bg-today-small.svg', import.meta.url).href
export const logoMark = new URL('../../assets/images/logo.svg', import.meta.url).href
export const iconSearch = new URL('../../assets/images/icon-search.svg', import.meta.url).href
export const iconUnits = new URL('../../assets/images/icon-units.svg', import.meta.url).href
export const iconDropdown = new URL('../../assets/images/icon-dropdown.svg', import.meta.url).href
export const iconLoading = new URL('../../assets/images/icon-loading.svg', import.meta.url).href
export const iconError = new URL('../../assets/images/icon-error.svg', import.meta.url).href
export const iconRetry = new URL('../../assets/images/icon-retry.svg', import.meta.url).href