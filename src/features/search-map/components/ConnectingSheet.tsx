import { Phone } from 'lucide-react'

interface ConnectingSheetProps {
  isConnecting: boolean
  sheetRef: React.RefObject<HTMLDivElement | null>

  sheetMetrics: {
    isDragging: boolean
    currentY: number
    isMinimized: boolean
  }
  handleTouchStart: (e: React.TouchEvent) => void
  handleTouchMove: (e: React.TouchEvent) => void
  handleTouchEnd: () => void
  handleHeaderTap: (e: React.MouseEvent) => void
}

export function ConnectingSheet({
  isConnecting,
  sheetRef,
  sheetMetrics,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleHeaderTap,
}: ConnectingSheetProps) {
  if (!isConnecting) return null

  return (
    <>
      <div
        ref={sheetRef}
        className={`fixed right-0 left-0 z-50 mx-auto max-w-[375px] transition-transform duration-300 ease-out`}
        style={{
          bottom: 0,
          transform: sheetMetrics.isDragging
            ? `translateY(${Math.max(0, sheetMetrics.currentY)}px)`
            : sheetMetrics.isMinimized
              ? 'translateY(calc(100% - 130px))'
              : 'translateY(0)',
          height: '70vh',
        }}
      >
        <div className="relative flex h-full w-full flex-col">
          {/* Main Content Card - Added transparency to see behind */}
          <div className="relative flex-1 overflow-hidden rounded-t-[24px] bg-linear-to-b from-[#FF715B99] to-[#FF715B] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] backdrop-blur-sm">
            {/* Drag Handle Area */}
            <div
              className="absolute top-0 left-0 z-50 flex h-[60px] w-full cursor-grab justify-center pt-3 active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={handleHeaderTap}
            >
              <div className="h-[4px] w-[40px] rounded-full bg-white/50" />
            </div>

            {/* Content */}
            <div className="flex h-full flex-col justify-center px-5 pt-12 pb-12">
              {/* ECG Animation Container */}
              <div className="relative mb-8 h-[180px] w-full">
                {/* Animated ECG Lines */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 375 180"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="ecgGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="white" stopOpacity="0" />
                      <stop offset="50%" stopColor="white" stopOpacity="1" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* ECG Line 1 */}
                  <path
                    d="M 0 90 L 60 90 L 70 70 L 75 110 L 80 50 L 85 90 L 140 90"
                    stroke="url(#ecgGradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    className="ecg-line"
                    style={{
                      animation: 'ecg-move 2s ease-in-out infinite',
                    }}
                  />

                  {/* ECG Line 2 */}
                  <path
                    d="M 140 90 L 200 90 L 210 70 L 215 110 L 220 50 L 225 90 L 280 90"
                    stroke="url(#ecgGradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    className="ecg-line"
                    style={{
                      animation: 'ecg-move 2s ease-in-out infinite 0.3s',
                    }}
                  />

                  {/* ECG Line 3 */}
                  <path
                    d="M 280 90 L 340 90 L 350 70 L 355 110 L 360 50 L 365 90 L 375 90"
                    stroke="url(#ecgGradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    className="ecg-line"
                    style={{
                      animation: 'ecg-move 2s ease-in-out infinite 0.6s',
                    }}
                  />
                </svg>

                {/* Phone Icon in Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-[90px] w-[90px] animate-pulse items-center justify-center rounded-full bg-white shadow-2xl">
                    <Phone
                      className="h-11 w-11 text-[#FF715B]"
                      fill="#FF715B"
                    />
                  </div>
                </div>
              </div>

              {/* Connecting Text */}
              <div className="text-center">
                <p className="mb-2 text-[22px] font-bold text-white">
                  연결중입니다<span className="animate-pulse">...</span>
                </p>
                <p className="text-[15px] text-white/80">
                  곧 병원과 연결됩니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ECG Animation Styles */}
      <style>{`
      @keyframes ecg-move {
        0% {
          opacity: 0.3;
          transform: translateX(-100px);
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.3;
          transform: translateX(100px);
        }
      }

      .ecg-line {
        filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
      }
    `}</style>
    </>
  )
}
