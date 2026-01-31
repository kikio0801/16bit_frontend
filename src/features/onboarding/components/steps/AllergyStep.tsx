import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { allergySchema } from '../../schema'
import { AllergyData } from '../../types'
import { ProgressBar } from '../progress-bar'
import { YesNoSelection } from '../yes-no-selection'
import { InputLabel, PrimaryButton } from '../form-components'

const ALLERGY_GROUPS = [
  {
    title: '약물 알레르기',
    required: true,
    items: ['페니실린계', '세팔로스포린계', '아스피린', 'NSAIDs', '기타'],
  },
  {
    title: '검사/의료 관련 알레르기',
    required: true,
    items: ['조영제', '라텍스', '알코올', '기타'],
  },
  {
    title: '식품 알레르기 (급성 반응)',
    required: true,
    items: ['견과류', '갑각류', '계란', '유제품', '복숭아', '기타'],
  },
]

interface AllergyStepProps {
  initialData: Partial<AllergyData>
  showFormProp: boolean
  setShowFormProp: (show: boolean) => void
  onNext: (data: AllergyData) => void
  onSkip: () => void
}

export function AllergyStep({
  initialData,
  showFormProp,
  setShowFormProp,
  onNext,
  onSkip,
}: AllergyStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<AllergyData>({
    resolver: zodResolver(allergySchema),
    defaultValues: {
      hasAllergy: initialData.hasAllergy,
      allergies: initialData.allergies || [],
    },
  })
  const selectedAllergies = watch('allergies') || []
  const [isGeneralOtherOpen, setIsGeneralOtherOpen] = useState(false)

  const handleChoice = (hasAllergy: boolean) => {
    setValue('hasAllergy', hasAllergy)
    if (hasAllergy) {
      setShowFormProp(true)
    } else {
      onSkip()
    }
  }

  const toggleAllergy = (allergy: string, groupIndex?: number) => {
    const current = selectedAllergies
    let newAllergies = []

    if (current.includes(allergy)) {
      newAllergies = current.filter((a) => a !== allergy)
      if (groupIndex !== undefined) {
        const fieldName = ['otherDrug', 'otherMedical', 'otherFood'][
          groupIndex
        ] as keyof AllergyData
        setValue(fieldName, '', { shouldValidate: true })
      }
    } else {
      newAllergies = [...current, allergy]
    }
    setValue('allergies', newAllergies, { shouldValidate: true })
  }

  // If showFormProp is false, we show the Yes/No selection.
  // This state is managed by the parent via props so back button works.

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ProgressBar currentStep={2} />
      {!showFormProp ? (
        <YesNoSelection question="알러지가 있나요?" onSelect={handleChoice} />
      ) : (
        <div className="flex h-full flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto pb-[calc(56px+16px+20px)]">
            <h1 className="mb-8 text-[22px] font-semibold text-[#292929]">
              알러지가 있으신가요?
            </h1>
            <div>
              <div className="mb-8 flex gap-3">
                <button
                  type="button"
                  className="h-[48px] rounded-[10px] border border-[#FF715B] bg-[#FFF1F0] px-6 text-[16px] font-medium text-[#FF715B]"
                >
                  있어요
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice(false)}
                  className="h-[48px] rounded-[10px] border border-[#E5E5E5] bg-white px-6 text-[16px] font-medium text-gray-600"
                >
                  없어요
                </button>
              </div>

              {ALLERGY_GROUPS.map((group, groupIndex) => {
                const otherValue = `${group.title}-기타`
                const isOtherSelected = selectedAllergies.includes(otherValue)
                const fieldName = ['otherDrug', 'otherMedical', 'otherFood'][
                  groupIndex
                ] as 'otherDrug' | 'otherMedical' | 'otherFood'

                return (
                  <div key={groupIndex} className="mb-8">
                    <InputLabel label={group.title} required={group.required} />
                    <div className="mb-3 flex flex-wrap gap-2">
                      {group.items.map((item) => {
                        const value = item === '기타' ? otherValue : item
                        const isSelected = selectedAllergies.includes(value)

                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() =>
                              toggleAllergy(
                                value,
                                item === '기타' ? groupIndex : undefined
                              )
                            }
                            className={clsx(
                              'rounded-full border px-4 py-2 text-[15px] font-medium transition-all',
                              isSelected
                                ? 'border-[#FF715B] bg-[#FFF1F0] text-[#FF715B]'
                                : 'border-[#E5E5E5] bg-white text-gray-600 hover:bg-gray-50'
                            )}
                          >
                            {item === '기타' ? '기타:' : item}
                          </button>
                        )
                      })}
                    </div>
                    {isOtherSelected && (
                      <input
                        className="animate-in fade-in slide-in-from-top-1 h-[49px] w-full rounded-[10px] border border-[#E5E5E5] px-4 text-[16px] duration-200 outline-none focus:border-[#FF715B]"
                        placeholder={`${group.title} (직접 입력)`}
                        {...register(fieldName)}
                      />
                    )}
                  </div>
                )
              })}

              <div className="mb-8">
                <InputLabel label="기타" required />
                {!isGeneralOtherOpen ? (
                  <button
                    type="button"
                    onClick={() => setIsGeneralOtherOpen(true)}
                    className="rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-[15px] font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    기타:
                  </button>
                ) : (
                  <input
                    className="animate-in fade-in zoom-in h-[49px] w-full rounded-[10px] border border-[#E5E5E5] px-4 text-[16px] duration-200 outline-none focus:border-[#FF715B]"
                    autoFocus
                    placeholder="기타 알레르기를 입력해주세요"
                    {...register('otherAllergy')}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="fixed right-0 bottom-0 left-0 mx-auto w-full max-w-[375px] bg-white px-5 pt-4 pb-10">
            <PrimaryButton onClick={handleSubmit(onNext)} disabled={!isValid}>
              다음
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  )
}
