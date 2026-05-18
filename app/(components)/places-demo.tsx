"use client"

import { useState } from "react"
import { toast } from "sonner"

import {
  PlacesAutocomplete,
  type SelectedPlace,
} from "@/components/ui/places-autocomplete"
import { cn } from "@/lib/utils"

const fadeUpClassname =
  "lg:motion-safe:opacity-0 lg:motion-safe:animate-fade-up"

export function PlacesDemoHero({
  className,
  countryCode,
  label,
}: {
  className?: string
  countryCode?: string
  label?: string
}) {
  const [selected, setSelected] = useState<SelectedPlace | null>(null)

  return (
    <div className={cn("flex w-full flex-col items-center gap-3", className)}>
      {label ? (
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      ) : null}
      <PlacesAutocomplete
        className={fadeUpClassname}
        countryCode={countryCode}
        placeholder={
          countryCode
            ? `Search addresses in ${countryCode.toUpperCase()}`
            : "Start typing an address"
        }
        onPlaceSelect={(place) => {
          setSelected(place)
          toast.success("Place selected", {
            description:
              place.lat != null && place.lng != null
                ? `${place.address} (${place.lat.toFixed(5)}, ${place.lng.toFixed(5)})`
                : place.address,
          })
        }}
      />
      {selected ? (
        <p className="max-w-xl text-center text-xs text-muted-foreground">
          Selected: {selected.address}
          {selected.placeId ? ` · ${selected.placeId}` : ""}
        </p>
      ) : null}
    </div>
  )
}
