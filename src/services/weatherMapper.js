export function buildLocationLabel(location) {
  if (!location) return ''
  const parts = [location.name]
  if (location.admin1) parts.push(location.admin1)
  if (location.country) parts.push(location.country)
  return parts.join(', ')
}

export function weatherCodeToText(code) {
  if (code === undefined || code === null) return 'Unknown'
  const mapping = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Freezing drizzle',
    57: 'Freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Freezing rain',
    67: 'Freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Rain showers',
    81: 'Rain showers',
    82: 'Violent showers',
    85: 'Snow showers',
    86: 'Snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with hail',
  }

  return mapping[code] ?? 'Unknown'
}

export function mapForecast(data) {
  const hourly = data.hourly || {}
  const daily = data.daily || {}

  const currentTime = data.current_weather?.time
  let currentIndex = 0

  if (currentTime && Array.isArray(hourly.time)) {
    const foundIndex = hourly.time.indexOf(currentTime)
    currentIndex = foundIndex >= 0 ? foundIndex : 0
  }

  const current = {
    time: hourly.time?.[currentIndex] ?? currentTime,
    temperature: data.current_weather?.temperature ?? hourly.temperature_2m?.[currentIndex],
    windspeed: data.current_weather?.windspeed ?? hourly.windspeed_10m?.[currentIndex],
    weathercode: data.current_weather?.weathercode ?? hourly.weathercode?.[currentIndex],
    apparent: hourly.apparent_temperature?.[currentIndex],
    humidity: hourly.relative_humidity_2m?.[currentIndex],
    precipitation: hourly.precipitation?.[currentIndex],
  }

  const dailyItems = Array.isArray(daily.time)
    ? daily.time.map((date, index) => ({
        date,
        max: daily.temperature_2m_max?.[index],
        min: daily.temperature_2m_min?.[index],
        weathercode: daily.weathercode?.[index],
        precipitation: daily.precipitation_sum?.[index],
        windspeed: daily.windspeed_10m_max?.[index],
      }))
    : []

  const hourlyByDay = {}
  if (Array.isArray(hourly.time)) {
    hourly.time.forEach((time, index) => {
      const day = time.split('T')[0]
      if (!hourlyByDay[day]) hourlyByDay[day] = []
      hourlyByDay[day].push({
        time,
        temperature: hourly.temperature_2m?.[index],
        weathercode: hourly.weathercode?.[index],
        precipitation: hourly.precipitation?.[index],
      })
    })
  }

  return {
    timezone: data.timezone,
    current,
    daily: dailyItems,
    hourlyByDay,
  }
}