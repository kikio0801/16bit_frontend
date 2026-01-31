import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { mockHospitals, unavailableHospitals } from '@/features/search-map/data'
import { SearchMapHeader } from '@/features/search-map/components/SearchMapHeader'
import { MapBackground } from '@/features/search-map/components/MapBackground'
import { SearchForm } from '@/features/search-map/components/SearchForm'
import { HospitalBottomSheet } from '@/features/search-map/components/HospitalBottomSheet'
import { ConnectingSheet } from '@/features/search-map/components/ConnectingSheet'

export const Route = createFileRoute('/search-map')({
  component: SearchMapPage,
})

function SearchMapPage() {
  const [location, setLocation] = useState<string>('')
  const [selectedPerson, setSelectedPerson] = useState<string>('')
  const [showHospitalSheet, setShowHospitalSheet] = useState(false)
  const [selectedHospitals, setSelectedHospitals] = useState<number[]>([])
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [hasCompletedCall, setHasCompletedCall] = useState(false)

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  // Connection & Bottom Sheet State
  const [isConnecting, setIsConnecting] = useState(false)
  const [sheetMetrics, setSheetMetrics] = useState({
    isDragging: false,
    startY: 0,
    currentY: 0, // Translation in pixels
    isMinimized: false,
  })

  const sheetRef = useRef<HTMLDivElement>(null)
  const hospitalSheetRef = useRef<HTMLDivElement>(null)

  const handleSearch = () => {
    if (!location.trim()) {
      setToastMessage('증상을 입력해주세요')
      return
    }
    if (!selectedPerson) {
      setToastMessage('환자를 선택해주세요')
      return
    }

    setShowHospitalSheet(true)
  }

  const toggleHospital = (hospitalId: number) => {
    const hospital = mockHospitals.find((h) => h.id === hospitalId)
    // Prevent selecting unavailable hospitals
    if (!hospital || hospital.status === 'full' || hospital.status === 'closed')
      return

    if (!isSelectionMode) {
      // Single Selection Mode: unique selection
      setSelectedHospitals((prev) =>
        prev.includes(hospitalId) ? [] : [hospitalId]
      )
    } else {
      // Multi Selection Mode: toggle behavior
      setSelectedHospitals((prev) =>
        prev.includes(hospitalId)
          ? prev.filter((id) => id !== hospitalId)
          : [...prev, hospitalId]
      )
    }
  }

  const toggleSelectionMode = () => {
    if (isSelectionMode) {
      // Cancel Selection Mode
      setIsSelectionMode(false)
      setSelectedHospitals([])
    } else {
      // Enter Selection Mode
      setIsSelectionMode(true)
    }
  }

  const handleConfirmConnection = () => {
    // setShowHospitalSheet(false) // Don't close the sheet
    setIsConnecting(true)
    // Reset sheet state
    setSheetMetrics({
      isDragging: false,
      startY: 0,
      currentY: 0,
      isMinimized: false,
    })

    // Restore Auto-Close Logic
    setTimeout(() => {
      setIsConnecting(false)
      setHasCompletedCall(true)
    }, 6000)
  }

  // --- Drag Logic for Connecting Sheet ---
  // Hospital Sheet Metrics (Draggable)
  const [hospitalSheetMetrics, setHospitalSheetMetrics] = useState({
    isDragging: false,
    startY: 0,
    currentY: 0,
    isMinimized: false,
  })

  const handleHospitalSheetTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return
    setHospitalSheetMetrics((prev) => ({
      ...prev,
      isDragging: true,
      startY: touch.clientY,
    }))
  }

  const handleHospitalSheetTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (!hospitalSheetMetrics.isDragging || !touch) return
    const deltaY = touch.clientY - hospitalSheetMetrics.startY
    if (deltaY < 0) return // Only drag down
    setHospitalSheetMetrics((prev) => ({ ...prev, currentY: deltaY }))
  }

  const handleHospitalSheetTouchEnd = () => {
    if (!hospitalSheetMetrics.isDragging) return
    const threshold = 150
    const shouldMinimize = hospitalSheetMetrics.currentY > threshold
    setHospitalSheetMetrics((prev) => ({
      ...prev,
      isDragging: false,
      isMinimized: shouldMinimize,
      currentY: 0,
    }))
  }

  const handleHospitalSheetHeaderTap = (e: React.MouseEvent) => {
    if (hospitalSheetMetrics.isMinimized) {
      setHospitalSheetMetrics((prev) => ({ ...prev, isMinimized: false }))
      e.stopPropagation()
    }
  }

  // Effect to reset metrics when sheet opens
  useEffect(() => {
    if (showHospitalSheet) {
      setHospitalSheetMetrics({
        isDragging: false,
        startY: 0,
        currentY: 0,
        isMinimized: false,
      })
    }
  }, [showHospitalSheet])

  // --- Drag Logic for Connecting Sheet ---
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return
    setSheetMetrics((prev) => ({
      ...prev,
      isDragging: true,
      startY: touch.clientY,
    }))
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (!sheetMetrics.isDragging || !touch) return
    const deltaY = touch.clientY - sheetMetrics.startY

    // Only allow dragging down (positive delta)
    if (deltaY < 0) return

    setSheetMetrics((prev) => ({
      ...prev,
      currentY: deltaY,
    }))
  }

  const handleTouchEnd = () => {
    if (!sheetMetrics.isDragging) return

    const threshold = 150 // Pixel threshold to snap to minimized
    const shouldMinimize = sheetMetrics.currentY > threshold

    setSheetMetrics((prev) => ({
      ...prev,
      isDragging: false,
      isMinimized: shouldMinimize,
      currentY: 0, // Reset visual translation
    }))
  }

  const handleHeaderTap = (e: React.MouseEvent) => {
    if (sheetMetrics.isMinimized) {
      setSheetMetrics((prev) => ({ ...prev, isMinimized: false }))
      e.stopPropagation()
    }
  }

  // Map Image Logic
  const showBrightMap = showHospitalSheet && hospitalSheetMetrics.isMinimized

  // Dim logic:
  // Show dim overlay if we are NOT showing the bright map.
  // BUT the MapBackground component handles internal opacity.
  // It takes `showBrightMap` to toggle opacity-40.
  // It takes `showDimOverlay` to show black/50 overlay.
  //
  // Original logic:
  // const showBrightMap = showHospitalSheet && hospitalSheetMetrics.isMinimized
  // const showDimOverlay = false (explicitly set to false in original code)

  const showDimOverlay = false

  return (
    <>
      <div className="relative mx-auto flex h-screen w-full max-w-[375px] flex-col overflow-hidden bg-white font-sans">
        <SearchMapHeader
          showHospitalSheet={showHospitalSheet}
          location={location}
          selectedPerson={selectedPerson}
          isConnecting={isConnecting}
        />

        <MapBackground
          showBrightMap={showBrightMap}
          showDimOverlay={showDimOverlay}
        />

        {/* Initial Search Form - NOT Draggable, Relative Flow */}
        {!showHospitalSheet && !isConnecting && (
          <SearchForm
            location={location}
            setLocation={setLocation}
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
            handleSearch={handleSearch}
          />
        )}

        {/* Toast Message */}
        {toastMessage && (
          <div className="pointer-events-none absolute top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 px-5">
            <div className="animate-in fade-in zoom-in rounded-[50px] bg-[#1C1C1CB2] px-6 py-3 text-center text-[15px] font-medium text-white shadow-lg duration-200">
              {toastMessage}
            </div>
          </div>
        )}
      </div>

      <HospitalBottomSheet
        showHospitalSheet={showHospitalSheet}
        hospitalSheetMetrics={hospitalSheetMetrics}
        setHospitalSheetMetrics={setHospitalSheetMetrics}
        handleTouchStart={handleHospitalSheetTouchStart}
        handleTouchMove={handleHospitalSheetTouchMove}
        handleTouchEnd={handleHospitalSheetTouchEnd}
        handleHeaderTap={handleHospitalSheetHeaderTap}
        mockHospitals={mockHospitals}
        unavailableHospitals={unavailableHospitals}
        toggleSelectionMode={toggleSelectionMode}
        isSelectionMode={isSelectionMode}
        selectedHospitals={selectedHospitals}
        toggleHospital={toggleHospital}
        handleConfirmConnection={handleConfirmConnection}
        hasCompletedCall={hasCompletedCall}
        sheetRef={hospitalSheetRef}
      />

      <ConnectingSheet
        isConnecting={isConnecting}
        sheetRef={sheetRef}
        sheetMetrics={sheetMetrics}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
        handleHeaderTap={handleHeaderTap}
      />
    </>
  )
}
