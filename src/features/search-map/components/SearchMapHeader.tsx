import { UserNav } from '@/components/layout/user-nav'
import { people } from '../data'

interface SearchMapHeaderProps {
  showHospitalSheet: boolean
  location: string
  selectedPerson: string
  isConnecting: boolean
}

export function SearchMapHeader({
  showHospitalSheet,
  location,
  selectedPerson,
  isConnecting,
}: SearchMapHeaderProps) {
  const personName = people.find((p) => p.id === selectedPerson)?.name

  return (
    <div className="relative z-20 flex w-full shrink-0 flex-col bg-white transition-all duration-300">
      {/* Main Header */}
      <header
        className={`flex h-[60px] w-full items-center justify-between px-5 ${showHospitalSheet ? '' : 'border-b border-transparent'}`}
      >
        <div className="pointer-events-auto flex items-center">
          <div className="flex items-center gap-2">
            <svg
              width="50"
              height="24"
              viewBox="0 0 50 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="0"
                y="19"
                fill="#FF715B"
                fontSize="22"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                KOK
              </text>
            </svg>
            {/* User Profile Name if needed */}
            {showHospitalSheet && selectedPerson && (
              <div className="flex items-center gap-1 text-[17px] font-bold text-[#1c1c1c]">
                <span className="mx-2 h-[14px] w-px bg-[#d9d9d9]"></span>
                {personName}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="pointer-events-auto flex h-10 w-10 items-center justify-center">
          <UserNav />
        </div>
      </header>

      {/* Symptom Display Bar (Only visible when searching/hospital list is open) */}
      {showHospitalSheet && !isConnecting && (
        <div className="pointer-events-auto px-5 pb-4">
          <div className="flex h-[48px] w-full items-center gap-2 rounded-[12px] bg-[#F4F4F4] px-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="flex-1 truncate text-[15px] text-[#333]">
              {location}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
