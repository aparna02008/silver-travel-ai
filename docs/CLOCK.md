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

### AnalogClock
Traditional analog clock display with moving hands.
- Hour, minute, and second hands
- Supports all timezones
- Multiple size options (sm, md, lg)

### ClockSettings
Settings panel for customizing clock behavior.
- Time format (12/24 hour)
- Update speed control (100-5000ms)
- Theme selection (Dark/Light)
- Analog clock toggle

### ClockPage
Main page component integrating all clock features.
- Settings panel on the left
- Clock grid on the right
- Responsive layout

## Timezone Data

25 Common Timezones included:
- Americas: New York, Los Angeles, Chicago, Denver, Toronto, Vancouver, São Paulo, Mexico City
- Europe: London, Paris, Berlin, Moscow, Istanbul
- Africa: Cairo, Lagos, Johannesburg
- Asia: Dubai, India, Bangkok, Singapore, Hong Kong, Tokyo, Seoul
- Pacific: Sydney, Auckland

## Usage

```jsx
import ClockPage from './pages/ClockPage'

// Use in routing
<Route path="/clock" element={<ClockPage />} />
```

## Customization

### Add New Timezones
Edit `src/utils/timezoneUtils.js` and add to `COMMON_TIMEZONES` array:

```javascript
{ name: 'City Name', zone: 'Timezone/Region', offset: +5, city: 'Country' }
```

### Timezone Format
Use standard IANA timezone identifiers:
- `America/New_York`
- `Europe/London`
- `Asia/Tokyo`

### Change Update Speed
Modify in ClockSettings component or set default in ClockPage state.

## Browser Compatibility

- ✅ Chrome/Edge (Full support)
- ✅ Firefox (Full support)
- ✅ Safari (Full support)
- ✅ Mobile browsers

## Performance

- Lightweight interval-based updates
- Efficient re-rendering with React hooks
- No external clock libraries required
- Smooth animations and transitions

## API Reference

### timezoneUtils.js

```javascript
// Get time in specific timezone
getTimeInTimezone(timezone) // Returns Date object

// Format time for display
formatTimeForDisplay(date, format) // '12hour' or '24hour'

// Find timezone by name
getTimezoneByName(name) // Returns timezone object
```

## Accessibility

- ♿ Keyboard navigation support
- 🔊 High contrast text
- 👁️ Clear visual hierarchy
- 📱 Mobile responsive

---

For more information or issues, check the main README.md