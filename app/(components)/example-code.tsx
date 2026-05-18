import { Code } from "@/components/code"
import { siteConfig } from "@/config/site"

const tsx = `import { PlacesAutocomplete } from "@/components/ui/places-autocomplete"

export default function AddressField() {
  return (
    <PlacesAutocomplete
      placeholder="Search for an address"
      onPlaceSelect={(place) => {
        console.log(place.address, place.lat, place.lng, place.placeId)
      }}
    />
  )
}

// Install with:
// bunx shadcn@latest add ${siteConfig.registry.placesAutocomplete}`

const code = `\`\`\`tsx
${tsx}
\`\`\``

export function ExampleCode() {
  return (
    <div className="code-example relative mt-6 w-full max-w-[800px] overflow-hidden md:mt-8">
      <div className="w-full">
        <Code dark={false} code={code} toCopy={tsx} />
        <Code dark={true} code={code} toCopy={tsx} />
      </div>
    </div>
  )
}
