import { Phone } from 'lucide-react'
import { Hospital } from '../types'

interface HospitalListProps {
  mockHospitals: Hospital[]
  unavailableHospitals: Hospital[]
  selectedHospitals: number[]
  toggleHospital: (id: number) => void
  isSelectionMode: boolean
  hasCompletedCall: boolean
  handleConfirmConnection: () => void
}

export function HospitalList({
  mockHospitals,
  unavailableHospitals,
  selectedHospitals,
  toggleHospital,
  isSelectionMode,
  hasCompletedCall,
  handleConfirmConnection,
}: HospitalListProps) {
  const displayedHospitals = hasCompletedCall
    ? [...mockHospitals, ...unavailableHospitals]
    : mockHospitals

  return (
    <>
      {/* Hospital List - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-white px-5 py-0">
        <div className="space-y-3 pt-2 pb-[calc(53px+32px+20px)]">
          {displayedHospitals.map((hospital) => {
            const isSelected = selectedHospitals.includes(hospital.id)
            const selectedIndex = selectedHospitals.indexOf(hospital.id) + 1
            const isUnavailable =
              hospital.status === 'full' || hospital.status === 'closed'

            return (
              <button
                key={hospital.id}
                onClick={() => toggleHospital(hospital.id)}
                disabled={isUnavailable}
                className={`relative w-full rounded-[12px] border-[1.5px] p-4 text-left transition-all ${
                  isSelected
                    ? 'border-[#FF715B] bg-[#FFF5F4]'
                    : 'border-[#E5E5E5] bg-white'
                } ${isUnavailable ? 'opacity-100' : ''}`}
              >
                <div className="flex items-start gap-3">
                  {/* Number Badge (Selection Mode) */}
                  {isSelectionMode && !isUnavailable && (
                    <div
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                        isSelected
                          ? 'bg-[#FF715B] text-white'
                          : 'bg-[#E5E5E5] text-[#999]'
                      }`}
                    >
                      {isSelected ? selectedIndex : ''}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-[16px] font-bold text-[#1C1C1C]">
                        {hospital.name}
                      </h3>
                      <span className="rounded bg-[#FFF5F4] px-1 py-0.5 text-[10px] text-[#FF715B]">
                        권역응급의료센터
                      </span>
                    </div>
                    <p className="mb-3 text-[13px] text-[#666]">
                      {hospital.distance} · {hospital.address}
                    </p>

                    {/* Status Content */}
                    {hospital.status === 'full' ? (
                      <div className="mt-2 flex h-[40px] w-full items-center justify-center gap-1.5 rounded-[8px] bg-[#FF715B]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                        >
                          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-[14px] font-bold text-white">
                          자리가 없어요
                        </span>
                      </div>
                    ) : hospital.status === 'closed' ? (
                      <div className="mt-2 flex h-[40px] w-full items-center justify-center gap-1.5 rounded-[8px] bg-[#FF715B]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                        >
                          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-[14px] font-bold text-white">
                          진료가 마감되었어요
                        </span>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <div className="flex h-[32px] items-center justify-center rounded-[6px] bg-[#3C3C43] px-3 text-[12px] font-medium text-white">
                          응급실 병상 {hospital.emergencyBeds}
                        </div>
                        <div className="flex h-[32px] items-center justify-center rounded-[6px] border border-[#00C896] bg-[#E3F5EC] px-3 text-[12px] font-bold text-[#00C896]">
                          수술실 {hospital.availableBeds}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Fixed Action Button */}
      <div className="fixed right-0 bottom-0 left-0 mx-auto w-full max-w-[375px] border-t border-gray-100 bg-white px-5 py-4">
        <button
          onClick={handleConfirmConnection}
          className="flex h-[53px] w-full items-center justify-center rounded-[10px] bg-[#FF715B] text-white transition-colors"
        >
          <span className="flex items-center gap-2 text-[17px] leading-normal font-bold whitespace-nowrap">
            <Phone className="h-5 w-5" />
            {selectedHospitals.length > 0
              ? `자동 응급 콜 ${selectedHospitals.length}곳`
              : '자동 응급 콜'}
          </span>
        </button>
      </div>
    </>
  )
}
