import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import {
  BasicInfoData,
  AllergyData,
  MedicationData,
  DiseaseFormData,
  OnboardingStep,
  OnboardingData,
} from '@/features/onboarding/types'
import { BasicInfoStep } from '@/features/onboarding/components/steps/BasicInfoStep'
import { AllergyStep } from '@/features/onboarding/components/steps/AllergyStep'
import { MedicationStep } from '@/features/onboarding/components/steps/MedicationStep'
import { DiseaseStep } from '@/features/onboarding/components/steps/DiseaseStep'
import { CompleteStep } from '@/features/onboarding/components/steps/CompleteStep'

export const Route = createFileRoute('/onboarding')({
  component: OnboardingPage,
})

function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<OnboardingStep>('basic')

  // -- Central State --
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({})

  // -- Step State Control (for Back button logic) --
  const [showAllergyForm, setShowAllergyForm] = useState(false)
  const [showMedicationForm, setShowMedicationForm] = useState(false)

  // -- Handlers --

  const handleBack = () => {
    if (step === 'basic') navigate({ to: '/login' })
    else if (step === 'allergy') {
      if (showAllergyForm) setShowAllergyForm(false)
      else setStep('basic')
    } else if (step === 'medication') {
      if (showMedicationForm) setShowMedicationForm(false)
      else setStep('allergy')
    } else if (step === 'disease') {
      // Logic: If coming back to disease, we reset to medication.
      // The inner disease step handles its own "No" toggle state internally if we wanted to be granular,
      // but here standard back goes to previous step.
      setStep('medication')
    } else if (step === 'complete') {
      setStep('disease')
    }
  }

  const onNextBasic = (data: BasicInfoData) => {
    console.log('Basic Info:', data)
    setOnboardingData((prev) => ({ ...prev, ...data }))
    setStep('allergy')
  }

  const onNextAllergy = (data: AllergyData) => {
    console.log('Allergy Data:', data)
    setOnboardingData((prev) => ({ ...prev, ...data }))
    setStep('medication')
  }

  const onSkipAllergy = () => {
    setOnboardingData((prev) => ({ ...prev, hasAllergy: false, allergies: [] }))
    setStep('medication')
  }

  const onNextMedication = (data: MedicationData) => {
    console.log('Medication Data:', data)
    setOnboardingData((prev) => ({ ...prev, ...data }))
    setStep('disease')
  }

  const onSkipMedication = () => {
    setOnboardingData((prev) => ({
      ...prev,
      hasMedication: false,
      medications: [],
    }))
    setStep('disease')
  }

  const onNextDisease = (data: DiseaseFormData) => {
    console.log('Disease Data:', data)
    // Flatten disease data for storage if needed, or keep as is.
    // The original logic mapped diseases to string array.
    // Flatten disease data for storage
    const finalDiseases = data.diseases?.map((d) => d.name) || []

    const finalData = {
      ...onboardingData,
      hasDisease: data.hasDisease,
      diseases: finalDiseases,
    }

    setOnboardingData(finalData)

    // Persist to localStorage
    const currentUserStr = localStorage.getItem('user')
    if (currentUserStr) {
      try {
        const currentUser = JSON.parse(currentUserStr)
        const updatedUser = { ...currentUser, ...finalData }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        localStorage.setItem('registeredUser', JSON.stringify(updatedUser))
      } catch (e) {
        console.error('Failed to parse user data during persistence', e)
      }
    }

    setStep('complete')
  }

  return (
    <div className="relative mx-auto flex h-screen w-full max-w-[375px] flex-col overflow-hidden bg-white px-5 pt-7">
      {/* Top Bar */}
      {step !== 'complete' && (
        <div className="mb-2 flex h-[44px] items-center">
          <button
            onClick={handleBack}
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 active:bg-gray-200"
          >
            <ChevronLeft className="h-6 w-6 text-[#1C1C1CB2]" strokeWidth={2} />
          </button>
        </div>
      )}

      {step === 'basic' && (
        <BasicInfoStep initialData={onboardingData} onNext={onNextBasic} />
      )}
      {step === 'allergy' && (
        <AllergyStep
          initialData={onboardingData}
          showFormProp={showAllergyForm}
          setShowFormProp={setShowAllergyForm}
          onNext={onNextAllergy}
          onSkip={onSkipAllergy}
        />
      )}
      {step === 'medication' && (
        <MedicationStep
          showFormProp={showMedicationForm}
          setShowFormProp={setShowMedicationForm}
          onNext={onNextMedication}
          onSkip={onSkipMedication}
        />
      )}
      {step === 'disease' && <DiseaseStep onNext={onNextDisease} />}
      {step === 'complete' && <CompleteStep data={onboardingData} />}
    </div>
  )
}
