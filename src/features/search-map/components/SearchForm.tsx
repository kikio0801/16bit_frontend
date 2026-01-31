import { people } from '../data'

interface SearchFormProps {
  location: string
  setLocation: (value: string) => void
  selectedPerson: string
  setSelectedPerson: (id: string) => void
  handleSearch: () => void
  maxLength?: number
}

export function SearchForm({
  location,
  setLocation,
  selectedPerson,
  setSelectedPerson,
  handleSearch,
  maxLength = 300,
}: SearchFormProps) {
  return (
    <div className="relative z-10 w-full shrink-0 rounded-t-[26px] bg-[#fcfcfc] px-5 pt-6 pb-8 shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]">
      {/* Title */}
      <div className="mb-5 flex items-center justify-center">
        <h1 className="text-center text-lg leading-[1.3] font-bold tracking-[0.18px] text-[#313131]">
          지금 갈 병원 찾기
        </h1>
      </div>

      {/* Symptom Input Section */}
      <div className="mb-5 flex w-full flex-col gap-2">
        <div className="flex items-center">
          <p className="text-base font-semibold text-black">증상</p>
        </div>
        <div className="relative flex h-[92px] flex-col justify-between rounded-[10px] border-[1.5px] border-solid border-[#d1d1d6] bg-white px-5 py-[10px]">
          <textarea
            value={location}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setLocation(e.target.value)
              }
            }}
            placeholder="증상에 대해 자유롭게 설명해주세요."
            className="flex-1 resize-none bg-transparent text-sm leading-[22px] font-medium tracking-[-0.08px] text-[#424242] placeholder:text-[#999999] focus:outline-none"
          />
          <p className="text-right text-xs leading-[22px] tracking-[-0.08px] text-[#cacaca]">
            {location.length}/{maxLength}
          </p>
        </div>
      </div>

      {/* Person Selection Section */}
      <div className="mb-6 flex w-full flex-col gap-2">
        <div className="flex items-center">
          <p className="text-base font-semibold text-black">환자 선택</p>
        </div>
        <div className="flex items-center gap-[11px]">
          {people.map((person) => (
            <button
              key={person.id}
              onClick={() => setSelectedPerson(person.id)}
              className={`relative flex h-[120px] flex-1 flex-col items-center justify-center rounded-[14px] border border-solid px-4 py-3 transition-colors ${
                selectedPerson === person.id
                  ? 'border-[#ff715b] bg-[#fff7f5]'
                  : 'border-[#e5e5ea] bg-white'
              }`}
            >
              {selectedPerson === person.id && (
                <div className="absolute top-[8px] right-[8px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#ff715b]">
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L4.5 8.5L11 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              <div className="relative mb-2">
                <div className="flex h-[53px] w-[53px] items-center justify-center overflow-hidden rounded-full bg-[#d1d1d6]">
                  <span className="text-2xl">👤</span>
                </div>
                {/* Online indicator */}
                <div className="absolute right-0 bottom-0 h-[10px] w-[10px] rounded-full border-2 border-white bg-[#34c759]" />
              </div>
              <div className="flex flex-col items-center gap-0">
                <p className="text-center text-sm leading-[18px] font-bold tracking-[-0.08px] text-black">
                  {person.name}
                </p>
                <p className="text-[10px] leading-[16px] font-medium text-[#8e8e93]">
                  {person.tags}
                </p>
              </div>
            </button>
          ))}
          <button className="flex h-[120px] flex-1 items-center justify-center rounded-[14px] border border-solid border-[#e5e5ea] bg-white px-4 py-3">
            <span className="text-3xl font-light text-[#333]">+</span>
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex w-full justify-center">
        <button
          onClick={handleSearch}
          disabled={false}
          className={`flex h-[53px] w-full items-center justify-center rounded-[10px] bg-[#313131] text-white transition-colors`}
        >
          <span className="text-[17px] leading-normal font-medium whitespace-nowrap">
            찾기
          </span>
        </button>
      </div>
    </div>
  )
}
