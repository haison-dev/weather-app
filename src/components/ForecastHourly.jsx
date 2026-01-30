import { formatHour, formatTemp } from '../utils/format'
import { weatherCodeToIcon } from '../utils/weatherIcons'

export default function ForecastHourly({ hours, units, dayLabel }) {
  if (!hours || hours.length === 0) return null

  return (
    <section className="rounded-3xl bg-neutral-800/70 p-5 text-neutral-0">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Hourly forecast</h2>
        <span className="text-xs text-neutral-300">{dayLabel}</span>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {hours.slice(0, 10).map((hour) => (
          <div
            key={hour.time}
            className="flex items-center justify-between rounded-2xl bg-neutral-700/70 px-4 py-3"
          >
            <span className="text-sm">{formatHour(hour.time)}</span>
            <img src={weatherCodeToIcon(hour.weathercode)} alt="" className="h-6 w-6" />
            <span className="text-sm font-semibold">{formatTemp(hour.temperature, units)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}