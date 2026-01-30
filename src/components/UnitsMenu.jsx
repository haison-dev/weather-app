import { useState } from 'react'
import { iconDropdown, iconUnits } from '../utils/weatherIcons'

export default function UnitsMenu({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const label = value === 'imperial' ? 'Imperial' : 'Metric'

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-xl bg-neutral-800/60 px-4 py-2 text-sm font-medium text-neutral-0 shadow-sm"
      >
        <img  src={iconUnits} alt="" className="h-4 w-4" />
        Units
        <img src={iconDropdown} alt="" className="h-3 w-3 opacity-80" />  
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl bg-neutral-800 text-sm text-neutral-0 shadow-lg">
          <button
            type="button"
            onClick={() => {
              onChange('metric')
              setOpen(false)
            }}
            className={`flex w-full items-center justify-between px-4 py-2 transition ${
              value === 'metric' ? 'bg-neutral-700' : 'hover:bg-neutral-700'
            }`}
          >
            Metric
            {value === 'metric' ? <span aria-hidden>✓</span> : null}
          </button>
          <button
            type="button"
            onClick={() => {
              onChange('imperial')
              setOpen(false)
            }}
            className={`flex w-full items-center justify-between px-4 py-2 transition ${
              value === 'imperial' ? 'bg-neutral-700' : 'hover:bg-neutral-700'
            }`}
          >
            Imperial
            {value === 'imperial' ? <span aria-hidden>✓</span> : null}
          </button>
        </div>
      ) : null}

      <span className="sr-only">{label}</span>
    </div>
  )
}