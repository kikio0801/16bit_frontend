import { memo } from 'react'

interface MapBackgroundProps {
  showBrightMap: boolean
  showDimOverlay?: boolean
}

export const MapBackground = memo(function MapBackground({
  showBrightMap,
  showDimOverlay = false,
}: MapBackgroundProps) {
  const mapImageSrc = showBrightMap
    ? '/assets/images/map.png'
    : '/assets/images/map-dimmed.png'

  return (
    <div className="relative z-0 w-full flex-1 overflow-hidden bg-[#f0f0f0]">
      {/* Dynamic Map Image */}
      <img
        src={mapImageSrc}
        alt="Map"
        className={`h-full w-full object-cover transition-all duration-300 ${!showBrightMap ? 'opacity-40' : ''}`}
      />

      {showDimOverlay && (
        <div className="animate-in fade-in absolute inset-0 z-10 bg-black/50 duration-200" />
      )}
    </div>
  )
})
