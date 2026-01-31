import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { medicationSchema } from '../../schema'
import { MedicationData } from '../../types'
import { ProgressBar } from '../progress-bar'
import { InputLabel, PrimaryButton } from '../form-components'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface MedicationStepProps {
  showFormProp: boolean
  setShowFormProp: (show: boolean) => void
  onNext: (data: MedicationData) => void
  onSkip: () => void
}

export function MedicationStep({
  setShowFormProp,
  onNext,
  onSkip,
}: MedicationStepProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<MedicationData>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      hasMedication: false,
      medications: [{ name: '', dosage: '', frequency: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medications',
  })

  const currentHasMedication = watch('hasMedication')

  const handleChoice = (hasMed: boolean) => {
    setValue('hasMedication', hasMed)
    if (hasMed) {
      setShowFormProp(true)
    } else {
      onSkip()
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ProgressBar currentStep={3} />
      <div className="flex-1 overflow-y-auto pb-[calc(56px+16px+20px)]">
        <h1 className="mb-8 text-[22px] font-semibold text-[#292929]">
          복용 중인 약이 있으신가요?
        </h1>

        <div className="pb-10">
          {/* Top Toggle */}
          <div className="mb-8 flex gap-3">
            <button
              type="button"
              onClick={() => handleChoice(true)}
              className={clsx(
                'h-[48px] flex-1 rounded-[10px] border text-[16px] font-medium transition-colors',
                currentHasMedication
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
                !currentHasMedication
                  ? 'border-[#E5E5E5] bg-white text-gray-600'
                  : 'border-[#E5E5E5] bg-white text-gray-600'
              )}
              style={
                !currentHasMedication
                  ? {
                      backgroundColor: '#FFF1F0',
                      borderColor: '#FF715B',
                      color: '#FF715B',
                    }
                  : {}
              }
            >
              없어요
            </button>
          </div>

          {/* Form List */}
          {currentHasMedication && (
            <div className="animate-in fade-in slide-in-from-top-2 flex flex-col gap-8 duration-300">
              {fields.map((field, index) => (
                <div key={field.id} className="relative flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-bold text-[#1C1C1C]">
                      복용약 {index + 1}
                    </h3>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-gray-400 hover:text-[#FF715B]"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>

                  <div>
                    <InputLabel label="복용약 및 용량" required />
                    <div className="flex gap-1.5">
                      <div className="min-w-0 flex-2">
                        <input
                          placeholder="약 이름"
                          {...register(`medications.${index}.name` as const)}
                          className={clsx(
                            'h-[42px] w-full rounded-[10px] border px-2 text-[14px] outline-none placeholder:text-gray-300',
                            errors.medications?.[index]?.name
                              ? 'border-[#FF715B]'
                              : 'border-[#E5E5E5] focus:border-[#FF715B]'
                          )}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <input
                          placeholder="용량"
                          {...register(`medications.${index}.dosage` as const)}
                          className={clsx(
                            'h-[42px] w-full rounded-[10px] border px-2 text-[14px] outline-none placeholder:text-gray-300',
                            errors.medications?.[index]?.dosage
                              ? 'border-[#FF715B]'
                              : 'border-[#E5E5E5] focus:border-[#FF715B]'
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <InputLabel label="복용 횟수" required />
                    <Select
                      value={watch(`medications.${index}.frequency`)}
                      onValueChange={(value) =>
                        setValue(`medications.${index}.frequency`, value, {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger
                        className={clsx(
                          'h-[42px] w-full rounded-[10px] border bg-white px-3 text-[14px]',
                          errors.medications?.[index]?.frequency
                            ? 'border-[#FF715B]'
                            : 'border-[#E5E5E5] focus:border-[#FF715B]'
                        )}
                      >
                        <SelectValue placeholder="선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="하루 1번">하루 1번</SelectItem>
                        <SelectItem value="하루 2번">하루 2번</SelectItem>
                        <SelectItem value="하루 3번">하루 3번</SelectItem>
                        <SelectItem value="필요시 복용">필요시 복용</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => append({ name: '', dosage: '', frequency: '' })}
                className="flex h-[56px] w-full items-center justify-center rounded-[10px] bg-[#F5F5F5] text-[16px] font-bold text-[#5E5E5E] transition-colors hover:bg-[#EAEAEA]"
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
          disabled={!isValid && currentHasMedication}
        >
          다음
        </PrimaryButton>
      </div>
    </div>
  )
}
