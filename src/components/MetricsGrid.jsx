import MetricCard from './MetricCard'
import { formatHumidity, formatPrecip, formatSpeed, formatTemp } from '../utils/format'

export default function MetricsGrid({ data, units }) {
  if (!data) return null

  return (
    <section className="grid gap-3 sm:grid-cols-4">
      <MetricCard label="Feels Like" value={formatTemp(data.apparent, units)} />
      <MetricCard label="Humidity" value={formatHumidity(data.humidity)} />
      <MetricCard label="Wind" value={formatSpeed(data.windspeed, units)} />
      <MetricCard label="Precipitation" value={formatPrecip(data.precipitation, units)} />
    </section>
  )
}