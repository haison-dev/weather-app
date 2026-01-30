import UnitsMenu from './UnitsMenu'
import { logoMark } from '../utils/weatherIcons'

export default function AppHeader({ units, onUnitsChange }) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logoMark} alt="Weather Now" className="h-full w-full" />
      </div>
      <UnitsMenu value={units} onChange={onUnitsChange} />
    </header>
  )
}