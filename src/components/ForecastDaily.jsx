import { formatDayShort, formatTemp } from '../utils/format'
import { weatherCodeToIcon } from '../utils/weatherIcons'

export default function ForecastDaily({ days, units, selectedIndex, onSelect }) {
  if (!days || days.length === 0) return null

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold text-neutral-0">Daily forecast</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {days.map((day, index) => (
          <button
            key={day.date}
            type="button"
            onClick={() => onSelect(index)}
            className={`flex min-w-[86px] flex-col items-center gap-2 rounded-2xl px-5 py-8 text-center transition ${
              index === selectedIndex ? 'bg-blue-500 text-neutral-0' : 'bg-neutral-800/70 text-neutral-0'
            }`}
          >
            <span className="text-xs font-semibold">{formatDayShort(day.date)}</span>
            <img src={weatherCodeToIcon(day.weathercode)} alt="" className="h-8 w-8" />
            <div className="text-xs">
              <span className="font-semibold">{formatTemp(day.max, units)}</span>
              <span className="ml-2 text-neutral-300">{formatTemp(day.min, units)}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}