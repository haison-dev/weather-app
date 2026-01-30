import { iconSearch } from '../utils/weatherIcons'

export default function SearchBar({ value, onChange, onSubmit, results, onSelectResult, status }) {
  return (
    <div className="space-y-4">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
        className="mx-auto   flex w-full max-w-2xl flex-col items-center gap-3 sm:flex-row"
      >
        <div className="relative flex w-full items-center rounded-2xl bg-neutral-800/70 px-4 py-3">
          <img src={iconSearch} alt="" className="h-4 w-4 opacity-70" />
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search for a place..."
            className="ml-3 w-full bg-transparent text-sm text-neutral-0 placeholder:text-neutral-300 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!value.trim() || status === 'searching'}
          className="h-11 rounded-2xl bg-blue-500 px-6 text-sm font-semibold text-neutral-0 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-neutral-600"
        >
          {status === 'searching' ? 'Searching...' : 'Search'}
        </button>
      </form>

      {results.length > 0 ? (
        <div className="rounded-2xl bg-neutral-800/80 p-3">
          <p className="px-2 text-xs uppercase tracking-widest text-neutral-300">Results</p>
          <div className="mt-2 flex flex-col gap-2">
            {results.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectResult(item)}
                className="rounded-xl bg-neutral-700/70 px-3 py-2 text-left text-sm text-neutral-0 transition hover:bg-neutral-700"
              >
                {item.name}
                {item.admin1 ? `, ${item.admin1}` : ''}
                {item.country ? `, ${item.country}` : ''}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
