import { z } from 'zod'
import {
  basicInfoSchema,
  allergySchema,
  medicationSchema,
  diseaseFormSchema,
} from './schema'

export type BasicInfoData = z.infer<typeof basicInfoSchema>
export type AllergyData = z.infer<typeof allergySchema>
export type MedicationData = z.infer<typeof medicationSchema>
export type DiseaseFormData = z.infer<typeof diseaseFormSchema>

export type DiseaseData = {
  hasDisease: boolean | null
  diseases?: string[]
  otherDisease?: string
}

export type OnboardingData = Partial<
  BasicInfoData & AllergyData & MedicationData & DiseaseData
>

export type OnboardingStep =
  | 'basic'
  | 'allergy'
  | 'medication'
  | 'disease'
  | 'complete'
