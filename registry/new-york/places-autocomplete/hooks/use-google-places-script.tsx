"use client"

import Script from "next/script"
import { useCallback, useMemo, useState } from "react"

export type UseGooglePlacesScriptOptions = {
  apiKey?: string
  id?: string
}

export function useGooglePlacesScript({
  apiKey,
  id = "google-maps-places",
}: UseGooglePlacesScriptOptions = {}) {
  const resolvedApiKey =
    apiKey ?? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""

  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const src = useMemo(() => {
    if (!resolvedApiKey) {
      return null
    }

    return `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      resolvedApiKey,
    )}&libraries=places&loading=async`
  }, [resolvedApiKey])

  const handleReady = useCallback(() => {
    setIsLoaded(true)
    setError(null)
  }, [])

  const handleError = useCallback(() => {
    setIsLoaded(false)
    setError("Google Maps failed to load")
  }, [])

  const GoogleMapsScript = useMemo(() => {
    if (!src) {
      return null
    }

    const scriptSrc = src

    function GoogleMapsScriptComponent() {
      return (
        <Script
          id={id}
          src={scriptSrc}
          strategy="afterInteractive"
          onLoad={handleReady}
          onReady={handleReady}
          onError={handleError}
        />
      )
    }

    return GoogleMapsScriptComponent
  }, [handleError, handleReady, id, src])

  return {
    apiKey: resolvedApiKey,
    isLoaded,
    error,
    hasApiKey: Boolean(resolvedApiKey),
    GoogleMapsScript,
  }
}
