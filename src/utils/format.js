export function formatTemp(value, units) {
  if (value === undefined || value === null) return '--'
  const rounded = Math.round(value)
  return `${rounded}°${units === 'imperial' ? 'F' : 'C'}`
}

export function formatSpeed(value, units) {
  if (value === undefined || value === null) return '--'
  const rounded = Math.round(value)
  return `${rounded} ${units === 'imperial' ? 'mph' : 'km/h'}`
}

export function formatPrecip(value, units) {
  if (value === undefined || value === null) return '--'
  const rounded = Math.round(value * 10) / 10
  return `${rounded} ${units === 'imperial' ? 'in' : 'mm'}`
}

export function formatHumidity(value) {
  if (value === undefined || value === null) return '--'
  return `${Math.round(value)}%`
}

export function formatDayShort(dateStr) {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(dateStr))
}

export function formatDateLong(dateStr) {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateStr))
}

export function formatHour(dateStr) {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric' }).format(new Date(dateStr))
}

export function formatDateTime(dateStr) {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(dateStr))
}