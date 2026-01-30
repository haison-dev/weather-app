import { iconError, iconLoading } from '../utils/weatherIcons'

export default function StatusPanel({ status, error }) {
  if (status === 'idle' || status === 'ready') return null

  const content = {
    loading: { text: 'Loading weather data...', icon: iconLoading },
    searching: { text: 'Searching for matching locations...', icon: iconLoading },
    'no-results': { text: 'No results. Try another city name.', icon: iconError },
    error: { text: error || 'Unable to load data right now.', icon: iconError },
  }[status]

  if (!content) return null

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-neutral-800/70 px-4 py-3 text-sm text-neutral-0">
      <img src={content.icon} alt="" className="h-5 w-5" />
      <span>{content.text}</span>
    </div>
  )
}