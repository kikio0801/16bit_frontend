interface YesNoSelectionProps {
  question: string
  onSelect: (value: boolean) => void
}

export function YesNoSelection({ question, onSelect }: YesNoSelectionProps) {
  return (
    <div className="flex h-full flex-col">
      <h1 className="mb-12 text-[22px] leading-[1.4] font-bold whitespace-pre-wrap text-[#1C1C1CB2]">
        {question}
      </h1>
      <div className="flex gap-3">
        <button
          onClick={() => onSelect(true)}
          className="h-[56px] w-full rounded-[10px] border border-[#E5E5E5] text-[16px] font-medium text-gray-600 transition-all hover:bg-gray-50 active:scale-[0.98]"
        >
          있어요
        </button>
        <button
          onClick={() => onSelect(false)}
          className="h-[56px] w-full rounded-[10px] border border-[#E5E5E5] text-[16px] font-medium text-gray-600 transition-all hover:bg-gray-50 active:scale-[0.98]"
        >
          없어요
        </button>
      </div>
    </div>
  )
}
