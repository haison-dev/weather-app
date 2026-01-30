const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }
  return response.json()
}

export async function searchLocation(query) {
  if (!query) return []

  const url = new URL(GEO_URL)
  url.search = new URLSearchParams({
    name: query,
    count: '5',
    language: 'en',
    format: 'json',
  }).toString()

  const data = await fetchJson(url)
  const results = Array.isArray(data.results) ? data.results : []

  return results.map((item) => ({
    id: item.id ?? `${item.latitude}:${item.longitude}`,
    name: item.name,
    admin1: item.admin1,
    country: item.country,
    latitude: item.latitude,
    longitude: item.longitude,
  }))
}

export async function fetchForecast(location, units) {
  const url = new URL(FORECAST_URL)
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current_weather: 'true',
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation',
      'windspeed_10m',
      'weathercode',
    ].join(','),
    daily: [
      'weathercode',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'windspeed_10m_max',
    ].join(','),
    timezone: 'auto',
  })

  if (units === 'imperial') {
    params.set('temperature_unit', 'fahrenheit')
    params.set('windspeed_unit', 'mph')
    params.set('precipitation_unit', 'inch')
  } else {
    params.set('temperature_unit', 'celsius')
    params.set('windspeed_unit', 'kmh')
    params.set('precipitation_unit', 'mm')
  }

  url.search = params.toString()
  return fetchJson(url)
}