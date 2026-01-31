import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { diseaseFormSchema } from '../../schema'
import { DiseaseFormData } from '../../types'
import { ProgressBar } from '../progress-bar'
import { InputField, InputLabel, PrimaryButton } from '../form-components'

interface DiseaseStepProps {
  onNext: (data: DiseaseFormData) => void
}

export function DiseaseStep({ onNext }: DiseaseStepProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<DiseaseFormData>({
    resolver: zodResolver(diseaseFormSchema),
    defaultValues: { hasDisease: null, diseases: [{ name: '' }] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'diseases',
  })

  const currentHasDisease = watch('hasDisease')

  const handleChoice = (hasDisease: boolean) => {
    setValue('hasDisease', hasDisease, { shouldValidate: true })
    if (hasDisease) {
      if (getValues('diseases')?.length === 0) {
        append({ name: '' })
      }
    } else {
      setValue('diseases', [], { shouldValidate: true })
      handleSubmit(onNext)()
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ProgressBar currentStep={4} />
      <div className="flex-1 overflow-y-auto pb-[calc(56px+16px+20px)]">
        <h1 className="mb-8 text-[22px] font-semibold text-[#292929]">
          기저질환이 있으신가요?
        </h1>

        <div className="pb-10">
          {/* Top Toggle */}
          <div className="mb-8 flex gap-3">
            <button
              type="button"
              onClick={() => handleChoice(true)}
              className={clsx(
                'h-[48px] flex-1 rounded-[10px] border text-[16px] font-medium transition-colors',
                currentHasDisease === true
                  ? 'border-[#FF715B] bg-[#FFF1F0] text-[#FF715B]'
                  : 'border-[#E5E5E5] bg-white text-gray-600'
              )}
            >
              있어요
            </button>
            <button
              type="button"
              onClick={() => handleChoice(false)}
              className={clsx(
                'h-[48px] flex-1 rounded-[10px] border text-[16px] font-medium transition-colors',
                currentHasDisease === false
                  ? 'border-[#FF715B] bg-[#FF715B] text-white'
                  : 'border-[#E5E5E5] bg-white text-gray-600'
              )}
            >
              없어요
            </button>
          </div>

          {/* Form only if Yes */}
          {currentHasDisease === true && (
            <div className="animate-in fade-in slide-in-from-top-2 flex flex-col gap-6 duration-300">
              {fields.map((field, index) => (
                <div key={field.id} className="relative">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute -top-8 right-0 flex items-center gap-1 pt-2 text-sm text-gray-400 hover:text-[#FF715B]"
                    >
                      <X size={16} />
                    </button>
                  )}

                  <InputLabel label={`기저질환 ${index + 1}`} required />
                  <InputField
                    placeholder="질병 이름"
                    {...register(`diseases.${index}.name` as const)}
                    error={errors.diseases?.[index]?.name?.message}
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => append({ name: '' })}
                className="flex h-[56px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#F5F5F5] font-bold text-[#5E5E5E] transition-colors hover:bg-[#EAEAEA]"
              >
                추가하기
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="fixed right-0 bottom-0 left-0 mx-auto w-full max-w-[375px] bg-white px-5 pt-4 pb-10">
        <PrimaryButton
          onClick={handleSubmit(onNext)}
          disabled={!isValid && currentHasDisease === true}
        >
          다음
        </PrimaryButton>
      </div>
    </div>
  )
}
