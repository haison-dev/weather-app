import { formatDateLong, formatTemp } from '../utils/format'
import { weatherCodeToText } from '../services/weatherMapper'
import { backgroundTodayLarge, backgroundTodaySmall } from '../utils/weatherIcons'
import { weatherCodeToIcon } from '../utils/weatherIcons'

export default function CurrentWeather({ data, units, locationLabel }) {
  if (!data) return null

  return (
    <section className="relative overflow-hidden rounded-3xl bg-blue-700 px-6 py-20 text-neutral-0 shadow-lg">
      <img
        src={backgroundTodayLarge}
        alt=""
        className="absolute inset-0 hidden h-full w-full object-cover opacity-90 sm:block"
      />
      <img
        src={backgroundTodaySmall}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-90 sm:hidden"
      />
      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold">{locationLabel}</p>
          <p className="text-sm text-neutral-200">{formatDateLong(data.time)}</p>
          <p className="mt-2 text-sm text-neutral-200">{weatherCodeToText(data.weathercode)}</p>
        </div>
        <div className="flex items-center gap-4">
          <img src={weatherCodeToIcon(data.weathercode)} alt="" className="h-14 w-14" />
          <span className="text-7xl font-bold">{formatTemp(data.temperature, units)}</span>
        </div>
      </div>
    </section>
  )
}