import { Hospital, SheetMetrics } from '../types'
import { HospitalList } from './HospitalList'

interface HospitalBottomSheetProps {
  showHospitalSheet: boolean
  hospitalSheetMetrics: SheetMetrics
  setHospitalSheetMetrics: React.Dispatch<React.SetStateAction<SheetMetrics>>
  handleTouchStart: (e: React.TouchEvent) => void
  handleTouchMove: (e: React.TouchEvent) => void
  handleTouchEnd: () => void
  handleHeaderTap: (e: React.MouseEvent) => void
  mockHospitals: Hospital[]
  unavailableHospitals: Hospital[]
  toggleSelectionMode: () => void
  isSelectionMode: boolean
  selectedHospitals: number[]
  toggleHospital: (id: number) => void
  handleConfirmConnection: () => void

  hasCompletedCall: boolean
  sheetRef: React.RefObject<HTMLDivElement | null>
}

export function HospitalBottomSheet({
  showHospitalSheet,
  hospitalSheetMetrics,
  setHospitalSheetMetrics,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleHeaderTap,
  mockHospitals,
  unavailableHospitals,
  toggleSelectionMode,
  isSelectionMode,
  selectedHospitals,
  toggleHospital,
  handleConfirmConnection,
  hasCompletedCall,
  sheetRef,
}: HospitalBottomSheetProps) {
  if (!showHospitalSheet) return null

  const availableCount = mockHospitals.filter((h) => h.availableBeds > 0).length
  const totalCount = hasCompletedCall
    ? mockHospitals.length + unavailableHospitals.length
    : mockHospitals.length

  return (
    <div
      ref={sheetRef}
      className="fixed right-0 left-0 z-50 mx-auto flex max-w-[375px] flex-col rounded-t-[24px] bg-white shadow-2xl transition-transform duration-300 ease-out"
      style={{
        bottom: 0,
        transform: hospitalSheetMetrics.isDragging
          ? `translateY(${Math.max(0, hospitalSheetMetrics.currentY)}px)`
          : hospitalSheetMetrics.isMinimized
            ? 'translateY(calc(100% - 130px))'
            : 'translateY(0)',
        height: '80vh',
      }}
    >
      {/* Handle Area */}
      <div
        className="flex shrink-0 cursor-grab justify-center pt-3 pb-2 active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleHeaderTap}
      >
        <div className="h-[4px] w-[40px] rounded-full bg-gray-300" />
      </div>

      {/* Content Container - Scrollable */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 bg-white px-5 pt-1 pb-4">
          {/* Title & Close */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 className="text-[20px] font-bold text-[#1C1C1C]">
              지금 갈 수 있는 병원
            </h2>
            <button
              onClick={() =>
                setHospitalSheetMetrics((prev) => ({
                  ...prev,
                  isMinimized: !prev.isMinimized,
                }))
              }
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Count & Toggle Row */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[14px] font-medium text-[#FF715B]">
                {availableCount}개 병원 수용 가능{' '}
                <span className="text-[#999]">· 전체 {totalCount}개</span>
              </p>
            </div>
          </div>

          {/* Multi-Select Toggle */}
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={toggleSelectionMode}
              className="flex items-center gap-1.5"
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${isSelectionMode ? 'border-[#FF715B]' : 'border-[#CCCCCC]'}`}
              >
                {isSelectionMode && (
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF715B]" />
                )}
              </div>
              <span
                className={`text-[14px] font-medium ${isSelectionMode ? 'text-[#FF715B]' : 'text-[#666]'}`}
              >
                병원 다중 선택
              </span>
            </button>

            {isSelectionMode && (
              <button
                onClick={toggleSelectionMode}
                className="text-[14px] text-[#666] underline decoration-gray-300 underline-offset-4"
              >
                취소
              </button>
            )}
          </div>
        </div>

        <HospitalList
          mockHospitals={mockHospitals}
          unavailableHospitals={unavailableHospitals}
          selectedHospitals={selectedHospitals}
          toggleHospital={toggleHospital}
          isSelectionMode={isSelectionMode}
          hasCompletedCall={hasCompletedCall}
          handleConfirmConnection={handleConfirmConnection}
        />
      </div>
    </div>
  )
}
