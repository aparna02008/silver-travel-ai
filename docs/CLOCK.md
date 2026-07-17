# Digital Clock Documentation

## Features

✨ **Real-time Clock Display** - Updates every second
🌍 **Multiple Timezones** - Track 25+ major world timezones
➕ **Add Custom Timezones** - Add any timezone you need
❌ **Remove Timezones** - Remove unwanted timezone displays
🔄 **Live Updates** - All clocks update simultaneously
⏰ **Analog & Digital** - Toggle between display formats
🎨 **Theme Support** - Dark and Light themes
⚙️ **Settings Panel** - Customize time format and update speed

## Components

### DigitalClock
Main component displaying multiple timezone clocks in grid layout.
- Shows time, date, and UTC offset for each timezone
- Add/remove timezone functionality
- Real-time updates

**Props**: None (uses internal state)

**State**:
- `timezones`: Array of timezone objects
- `currentTime`: Current local time
- `showInput`: Show/hide add timezone input
- `newTimezone`: Input value for new timezone

### AnalogClock
Traditional analog clock display with moving hands.
- Hour, minute, and second hands
- Supports all timezones
- Multiple size options (sm, md, lg)

**Props**:
- `timezone` (required): Timezone string (e.g., 'Asia/Tokyo')
- `size`: 'sm', 'md', or 'lg' (default: 'md')

### ClockSettings
Settings panel for customizing clock behavior.
- Time format (12/24 hour)
- Update speed control (100-5000ms)
- Theme selection (Dark/Light)
- Analog clock toggle

**Props**:
- `onSettingsChange` (required): Callback function receiving settings object

**Callback Parameters**:
```javascript
{
  format: '12hour' | '24hour',
  updateSpeed: number (ms),
  theme: 'dark' | 'light',
  showAnalog: boolean
}
```

### ClockPage
Main page component integrating all clock features.
- Settings panel on the left
- Clock grid on the right
- Responsive layout

## Timezone Data

25 Common Timezones included:

### Americas
- New York (America/New_York, UTC-5)
- Los Angeles (America/Los_Angeles, UTC-8)
- Chicago (America/Chicago, UTC-6)
- Denver (America/Denver, UTC-7)
- Toronto (America/Toronto, UTC-5)
- Vancouver (America/Vancouver, UTC-8)
- São Paulo (America/Sao_Paulo, UTC-3)
- Mexico City (America/Mexico_City, UTC-6)

### Europe
- London (Europe/London, UTC+0)
- Paris (Europe/Paris, UTC+1)
- Berlin (Europe/Berlin, UTC+1)
- Moscow (Europe/Moscow, UTC+3)
- Istanbul (Europe/Istanbul, UTC+3)

### Africa
- Cairo (Africa/Cairo, UTC+2)
- Lagos (Africa/Lagos, UTC+1)
- Johannesburg (Africa/Johannesburg, UTC+2)

### Asia
- Dubai (Asia/Dubai, UTC+4)
- India (Asia/Kolkata, UTC+5:30)
- Bangkok (Asia/Bangkok, UTC+7)
- Singapore (Asia/Singapore, UTC+8)
- Hong Kong (Asia/Hong_Kong, UTC+8)
- Tokyo (Asia/Tokyo, UTC+9)
- Seoul (Asia/Seoul, UTC+9)

### Pacific
- Sydney (Australia/Sydney, UTC+10)
- Auckland (Pacific/Auckland, UTC+12)

## Usage

### Import and Use ClockPage

```jsx
import ClockPage from './pages/ClockPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/clock" element={<ClockPage />} />
      </Routes>
    </Router>
  )
}
```

### Use Individual Components

```jsx
import DigitalClock from './components/DigitalClock'
import AnalogClock from './components/AnalogClock'
import ClockSettings from './components/ClockSettings'

function MyClockComponent() {
  const [settings, setSettings] = useState({
    format: '12hour',
    updateSpeed: 1000,
    theme: 'dark',
    showAnalog: false
  })

  return (
    <div>
      <ClockSettings onSettingsChange={setSettings} />
      <DigitalClock />
      {settings.showAnalog && <AnalogClock timezone="Asia/Tokyo" size="lg" />}
    </div>
  )
}
```

## Customization

### Add New Timezones

Edit `src/utils/timezoneUtils.js` and add to `COMMON_TIMEZONES` array:

```javascript
export const COMMON_TIMEZONES = [
  // ... existing zones
  { name: 'City Name', zone: 'Timezone/Region', offset: +5, city: 'Country' }
]
```

### Timezone Format

Use standard IANA timezone identifiers:
- `America/New_York`
- `Europe/London`
- `Asia/Tokyo`
- `Australia/Sydney`

[Full list of IANA timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

### Change Default Update Speed

In `src/pages/ClockPage.jsx`:

```javascript
const [settings, setSettings] = useState({
  format: '12hour',
  updateSpeed: 500, // Change this value
  theme: 'dark',
  showAnalog: false
})
```

### Custom Styling

Modify TailwindCSS classes in components:

```jsx
// In DigitalClock component
<div className="bg-slate-800 rounded-2xl p-6"> {/* Modify these classes */}
  {/* ... */}
</div>
```

## API Reference

### timezoneUtils.js

#### `getTimeInTimezone(timezone: string): Date`
Get current time in a specific timezone.

```javascript
const tokyoTime = getTimeInTimezone('Asia/Tokyo')
console.log(tokyoTime) // Date object with Tokyo time
```

#### `formatTimeForDisplay(date: Date, format: string): string`
Format a Date object for display.

```javascript
const formatted = formatTimeForDisplay(new Date(), '24hour')
console.log(formatted) // '14:30:45'
```

#### `getTimezoneByName(name: string): object`
Find timezone object by name.

```javascript
const tz = getTimezoneByName('Tokyo')
console.log(tz) // { name: 'Tokyo', zone: 'Asia/Tokyo', offset: 9, city: 'Japan' }
```

## Browser Compatibility

- ✅ Chrome/Edge (Full support)
- ✅ Firefox (Full support)
- ✅ Safari (Full support)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight interval-based updates
- Efficient re-rendering with React hooks
- No external clock libraries required
- Smooth animations and transitions
- Minimal DOM manipulations

## Accessibility

- ⌨️ Keyboard navigation support
- 🔊 High contrast text
- 👁️ Clear visual hierarchy
- 📱 Mobile responsive
- 🎯 Focus indicators on interactive elements

## Best Practices

1. **Memory Management**: Clocks use `useEffect` cleanup to clear intervals
2. **Performance**: Avoid rendering too many clocks (recommended max: 20)
3. **Timezone Validation**: Always use valid IANA timezone identifiers
4. **Fallback Handling**: Try-catch blocks handle invalid timezones gracefully

## Troubleshooting

### Clock not updating
```javascript
// Check if interval is clearing properly
// Ensure component hasn't unmounted before interval clears
```

### Incorrect time display
```javascript
// Verify timezone identifier is correct
// Check browser timezone settings
// Ensure date object is created before timezone conversion
```

### Performance issues
```javascript
// Reduce number of displayed clocks
// Increase update speed (larger interval)
// Check for memory leaks in browser DevTools
```

## Examples

### Example 1: Show only business hours timezones
```jsx
const businessZones = [
  { name: 'New York', zone: 'America/New_York', offset: -5 },
  { name: 'London', zone: 'Europe/London', offset: 0 },
  { name: 'Tokyo', zone: 'Asia/Tokyo', offset: 9 },
  { name: 'Sydney', zone: 'Australia/Sydney', offset: 10 }
]
// Use in component state
```

### Example 2: Auto-refresh every 500ms
```jsx
const [settings, setSettings] = useState({
  updateSpeed: 500 // 2 updates per second
})
```

### Example 3: Dark mode by default
```jsx
const [settings, setSettings] = useState({
  theme: 'dark' // System starts in dark mode
})
```

---

For more information or issues, check the main README.md