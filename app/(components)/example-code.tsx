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
    <div className="code-example relative mt-8 w-full overflow-hidden md:mt-12 lg:mt-16 lg:animate-none lg:opacity-0 lg:animate-fade-in [animation-delay:5000ms]">
      <div className="w-full">
        <Code dark={false} code={code} toCopy={tsx} />
        <Code dark={true} code={code} toCopy={tsx} />
      </div>

      <div className="code-example-overlay pointer-events-none absolute inset-x-0 top-0 -bottom-full z-20 hidden [animation-delay:5000ms] lg:block" />

      <div className="code-example-anchor pointer-events-none absolute -top-[5.5rem] h-px w-px" />
    </div>
  )
}
