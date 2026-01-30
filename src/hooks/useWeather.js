import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchForecast, searchLocation } from '../services/weatherApi'
import { buildLocationLabel, mapForecast } from '../services/weatherMapper'

const DEFAULT_LOCATION = {
  name: 'New York',
  admin1: 'New York',
  country: 'US',
  latitude: 40.7128,
  longitude: -74.006,
}

export function useWeather() {
  const [query, setQuery] = useState('')
  const [units, setUnits] = useState('metric')
  const [location, setLocation] = useState(DEFAULT_LOCATION)
  const [results, setResults] = useState([])
  const [forecast, setForecast] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [dayIndex, setDayIndex] = useState(0)

  const locationLabel = useMemo(() => buildLocationLabel(location), [location])

  const runSearch = useCallback(async () => {
    const trimmed = query.trim()
    if (!trimmed) return

    setStatus('searching')
    setError('')

    try {
      const data = await searchLocation(trimmed)
      if (data.length === 0) {
        setResults([])
        setStatus('no-results')
        return
      }

      setResults(data)
      setStatus('idle')
    } catch (err) {
      setStatus('error')
      setError(err?.message || 'Unable to search for locations')
    }
  }, [query])

  const selectLocation = useCallback((item) => {
    setLocation(item)
    setResults([])
  }, [])

  useEffect(() => {
    if (!location) return
    let active = true

    setStatus('loading')
    setError('')

    fetchForecast(location, units)
      .then((data) => {
        if (!active) return
        setForecast(mapForecast(data))
        setDayIndex(0)
        setStatus('ready')
      })
      .catch((err) => {
        if (!active) return
        setStatus('error')
        setError(err?.message || 'Unable to load weather data')
      })

    return () => {
      active = false
    }
  }, [location, units])

  return {
    query,
    setQuery,
    units,
    setUnits,
    locationLabel,
    results,
    status,
    error,
    forecast,
    dayIndex,
    setDayIndex,
    runSearch,
    selectLocation,
  }
}