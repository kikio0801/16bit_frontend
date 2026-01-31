import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { Calendar } from 'lucide-react'
import { basicInfoSchema } from '../../schema'
import { BasicInfoData } from '../../types'
import { ProgressBar } from '../progress-bar'
import { InputField, InputLabel, PrimaryButton } from '../form-components'

interface BasicInfoStepProps {
  initialData: Partial<BasicInfoData>
  onNext: (data: BasicInfoData) => void
}

export function BasicInfoStep({ initialData, onNext }: BasicInfoStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    mode: 'onChange',
    defaultValues: {
      name: initialData.name || '',
      birthDate: initialData.birthDate || '',
      gender: initialData.gender || undefined,
      height: initialData.height || '',
      weight: initialData.weight || '',
    },
  })
  const gender = watch('gender')

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ProgressBar currentStep={1} />
      <div className="flex-1 overflow-y-auto pb-[calc(56px+16px+20px)]">
        <h1 className="mb-8 text-[22px] font-semibold tracking-[-0.44px] text-[#292929]">
          기본 정보를 입력해 주세요.
        </h1>

        <div className="flex flex-col gap-6">
          <InputField
            label="이름"
            required
            placeholder="홍길동"
            {...register('name')}
            error={errors.name?.message}
          />

          <div className="flex gap-4">
            <div className="min-w-0 flex-[1.5] flex-col">
              <InputLabel label="생년월일" required />
              <div className="relative">
                <input
                  type="date"
                  {...register('birthDate')}
                  className={clsx(
                    'h-[45px] w-full rounded-[12px] border-[1.5px] px-3 text-[15px] outline-none placeholder:text-[#9D9D9D]',
                    '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-date-and-time-value]:text-left',
                    '[&::-webkit-clear-button]:hidden [&::-webkit-inner-spin-button]:appearance-none',
                    errors.birthDate
                      ? 'border-[#FF715B]'
                      : 'border-[#DDD] focus:border-[#FF715B]'
                  )}
                  style={{
                    WebkitAppearance: 'none',
                  }}
                />
                <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#9D9D9D]" />
              </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <InputLabel label="성별" required />
              <div className="flex gap-[7px]">
                <button
                  type="button"
                  onClick={() =>
                    setValue('gender', 'male', { shouldValidate: true })
                  }
                  className={clsx(
                    'h-[45px] flex-1 rounded-[12px] border-[1.5px] text-[16px] font-medium transition-colors',
                    gender === 'male'
                      ? 'border-[#FF715B] bg-[#FFF1F0] text-[#FF715B]'
                      : 'border-[#DDD] bg-white text-[#9D9D9D]'
                  )}
                >
                  남
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setValue('gender', 'female', { shouldValidate: true })
                  }
                  className={clsx(
                    'h-[45px] flex-1 rounded-[12px] border-[1.5px] text-[16px] font-medium transition-colors',
                    gender === 'female'
                      ? 'border-[#FF715B] bg-[#FFF1F0] text-[#FF715B]'
                      : 'border-[#DDD] bg-white text-[#9D9D9D]'
                  )}
                >
                  여
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <InputLabel label="키" required />
              <div className="flex items-center gap-[7px]">
                <input
                  type="number"
                  placeholder="163"
                  {...register('height')}
                  className={clsx(
                    'h-[45px] w-full rounded-[12px] border-[1.5px] px-4 text-[16px] outline-none',
                    errors.height
                      ? 'border-[#FF715B]'
                      : 'border-[#DDD] focus:border-[#FF715B]'
                  )}
                />
                <span className="text-[16px] font-medium text-[#9D9D9D]">
                  cm
                </span>
              </div>
            </div>
            <div className="flex-1">
              <InputLabel label="몸무게" required />
              <div className="flex items-center gap-[7px]">
                <input
                  type="number"
                  placeholder="55"
                  {...register('weight')}
                  className={clsx(
                    'h-[45px] w-full rounded-[12px] border-[1.5px] px-4 text-[16px] outline-none',
                    errors.weight
                      ? 'border-[#FF715B]'
                      : 'border-[#DDD] focus:border-[#FF715B]'
                  )}
                />
                <span className="text-[16px] font-medium text-[#9D9D9D]">
                  kg
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed right-0 bottom-0 left-0 mx-auto w-full max-w-[375px] bg-white px-5 pt-4 pb-10">
        <PrimaryButton onClick={handleSubmit(onNext)} disabled={!isValid}>
          다음
        </PrimaryButton>
      </div>
    </div>
  )
}
