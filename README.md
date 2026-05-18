# shadcn-google-maps

A modern Google Places autocomplete component for [shadcn/ui](https://ui.shadcn.com/) and Next.js, built on the **Places API (New)** — not legacy Autocomplete widgets.

**Accessible. Customizable. Open Source.**

## Features

- Uses **Places API (New)**: `importLibrary("places")`, `AutocompleteSuggestion.fetchAutocompleteSuggestions`, `PlacePrediction.toPlace()`, and session tokens
- **shadcn/ui** styling with `Input` and design tokens
- **Typed results** via `SelectedPlace` — no `google.maps.*` types required in your app code
- Debounced search, keyboard navigation, and graceful fallback when the script fails
- Install via **shadcn registry** or copy-paste

## Demo

Live demo: [shadcn-google-maps.vercel.app](https://shadcn-google-maps.vercel.app)

## Modern API vs legacy

| | Legacy (avoid for new work) | This component (Places API New) |
|---|---|---|
| Autocomplete | `google.maps.places.Autocomplete` widget | Programmatic suggestion list |
| Predictions | `AutocompleteService.getPlacePredictions()` | `AutocompleteSuggestion.fetchAutocompleteSuggestions()` |
| Place details | `PlacesService.getDetails()` | `prediction.toPlace()` + `fetchFields()` |
| Billing | Per-request without session grouping | Session tokens group autocomplete + details |

Google recommends the [Places API (New)](https://developers.google.com/maps/documentation/javascript/place-autocomplete-overview) for new integrations. Legacy patterns still work but are not what this component targets.

## Google Cloud setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/).
2. Enable APIs:
   - **Maps JavaScript API**
   - **Places API (New)** (not only the older "Places API" name if listed separately)
3. Create an API key under **APIs & Services → Credentials**.
4. **Restrict the key** (strongly recommended):
   - **Application restrictions → HTTP referrers**
     - `https://yourdomain.com/*`
     - `http://localhost:3000/*` (development)
   - **API restrictions** → limit to Maps JavaScript API and Places API (New)

Without referrer restrictions, anyone who finds your key can use it from other websites and run up your bill.

5. Add to `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

## Installation

### shadcn CLI (recommended)

```bash
bunx shadcn@latest add https://shadcn-google-maps.vercel.app/r/places-autocomplete.json
```

Or after deploying your fork, replace the URL with your registry JSON endpoint.

### Manual copy

Copy the files from [`registry/new-york/places-autocomplete/`](https://github.com/gurbaaz27/shadcn-google-maps/tree/main/registry/new-york/places-autocomplete) into your project (typically under `components/ui/` and `hooks/`).

### Dependencies

```bash
bun add lucide-react
bun add -d @types/google.maps
bunx shadcn@latest add input button
```

## Usage

```tsx
"use client"

import { PlacesAutocomplete } from "@/components/ui/places-autocomplete"

export function AddressField() {
  return (
    <PlacesAutocomplete
      placeholder="Search for an address"
      countryCode="us"
      onPlaceSelect={(place) => {
        console.log(place.address, place.lat, place.lng, place.placeId)
      }}
    />
  )
}
```

### Controlled input

```tsx
<PlacesAutocomplete
  value={address}
  onValueChange={setAddress}
  onPlaceSelect={(place) => setAddress(place.address)}
/>
```

## API reference

### `PlacesAutocomplete` props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPlaceSelect` | `(place: SelectedPlace) => void` | — | **Required.** Called when user selects a suggestion |
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | `""` | Initial value (uncontrolled) |
| `onValueChange` | `(value: string) => void` | — | Input text changes |
| `apiKey` | `string` | env | Overrides `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` |
| `countryCode` | `string \| null` | — | ISO region code (e.g. `"us"`) |
| `debounceMs` | `number` | `300` | Debounce before fetching |
| `placeholder` | `string` | `"Start typing an address"` | Input placeholder |
| `disabled` | `boolean` | `false` | Disable input |
| `className` | `string` | — | Wrapper class |
| `inputClassName` | `string` | — | Input class |
| `showPoweredByGoogle` | `boolean` | `true` | Show required attribution |

### `SelectedPlace`

```typescript
type SelectedPlace = {
  address: string
  lat: number | null
  lng: number | null
  placeId: string | null
}
```

## Registry development

This repo publishes registry JSON for `shadcn add`:

```bash
bun run registry:build   # outputs public/r/places-autocomplete.json
bun run dev
```

## Local development

```bash
bun install
cp .env.example .env.local
# add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
bun run dev
```

## License

MIT © [Gurbaaz Singh Nandra](https://x.com/GurbaazNandra)

## Links

- [Live demo](https://shadcn-google-maps.vercel.app)
- [GitHub](https://github.com/gurbaaz27/shadcn-google-maps)
- [Registry item](https://shadcn-google-maps.vercel.app/r/places-autocomplete.json)
