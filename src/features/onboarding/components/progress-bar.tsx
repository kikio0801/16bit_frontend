import clsx from 'clsx'

interface ProgressBarProps {
  currentStep: number
  totalSteps?: number
}

export function ProgressBar({ currentStep, totalSteps = 4 }: ProgressBarProps) {
  // Steps: Basic(1) -> Allergy(2) -> Medication(3) -> Disease(4)
  return (
    <div className="mb-6 flex gap-[6px]">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((i) => (
        <div
          key={i}
          className={clsx(
            'h-[3px] flex-1 rounded-[5px] transition-colors',
            i <= currentStep ? 'bg-[#333]' : 'bg-[#DEDEDE]'
          )}
        />
      ))}
    </div>
  )
}
