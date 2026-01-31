import { useNavigate } from '@tanstack/react-router'
import { OnboardingData } from '../../types'
import { PrimaryButton } from '../form-components'

interface CompleteStepProps {
  data: OnboardingData
}

export function CompleteStep({ data }: CompleteStepProps) {
  const navigate = useNavigate()

  return (
    <div className="animate-in fade-in zoom-in flex h-full flex-col items-center justify-center overflow-hidden duration-300">
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto pb-[calc(56px+16px+20px)]">
        {/* Logo Icon */}
        <div className="relative mb-6">
          <img
            src="/assets/logos/kok-logo.svg"
            alt="Logo"
            width="88"
            height="88"
            className="mx-auto"
          />
        </div>

        <h1 className="mb-2 text-center text-[24px] leading-[1.3] font-bold whitespace-pre-wrap text-[#292929]">
          {data.name ? `${data.name}님` : '회원님'}
          <br />
          프로필 설정을 완료했어요!
        </h1>
        <p className="mb-10 translate-y-2 text-center text-gray-500">
          이제 내 주변 병원을
          <br />
          편리하게 찾을 수 있어요.
        </p>
      </div>

      <div className="fixed right-0 bottom-0 left-0 mx-auto w-full max-w-[375px] bg-white px-5 pt-4 pb-10">
        <PrimaryButton onClick={() => navigate({ to: '/search-map' })}>
          서비스 시작하기
        </PrimaryButton>
      </div>
    </div>
  )
}
