import Container from './layout/Container'
import AppHeader from './components/AppHeader'
import SearchBar from './components/SearchBar'
import StatusPanel from './components/StatusPanel'
import CurrentWeather from './components/CurrentWeather'
import MetricsGrid from './components/MetricsGrid'
import ForecastDaily from './components/ForecastDaily'
import ForecastHourly from './components/ForecastHourly'
import { useWeather } from './hooks/useWeather'
import { formatDayShort } from './utils/format'

export default function App() {
  const {
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
  } = useWeather()

  const days = forecast?.daily ?? []
  const selectedDay = days[dayIndex]
  const hours = selectedDay ? forecast?.hourlyByDay?.[selectedDay.date] ?? [] : []

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0926] via-[#14113a] to-[#1a1546]">
      <Container className="py-8 sm:py-10">
        <AppHeader units={units} onUnitsChange={setUnits} />

        <div  div className="mt-10 space-y-6">
          <div className="text-center text-3xl font-bold text-neutral-0 sm:text-4xl">
            How's the sky looking today?
          </div>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={runSearch}
            results={results}
            onSelectResult={selectLocation}
            status={status}
          />
          <StatusPanel status={status} error={error} />
        </div>

        {forecast ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-6">
              <CurrentWeather data={forecast.current} units={units} locationLabel={locationLabel} />
              <MetricsGrid data={forecast.current} units={units} />
              <ForecastDaily
                days={days}
                units={units}
                selectedIndex={dayIndex}
                onSelect={setDayIndex}
              />
            </div>
            <ForecastHourly hours={hours} units={units} dayLabel={formatDayShort(selectedDay?.date)} />
          </div>
        ) : null}
      </Container>
    </main>
  )
}