import { z } from 'zod'

// Step 1: Basic Info
export const basicInfoSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  birthDate: z.string().min(1, '생년월일을 선택해주세요'),
  gender: z.enum(['male', 'female'], {
    required_error: '성별을 선택해주세요',
  }),
  height: z.string().min(1, '키를 입력해주세요'),
  weight: z.string().min(1, '몸무게를 입력해주세요'),
})

// Step 2: Allergy
export const allergySchema = z
  .object({
    hasAllergy: z.boolean(),
    allergies: z.array(z.string()).optional(),
    otherAllergy: z.string().optional(),
    otherDrug: z.string().optional(),
    otherMedical: z.string().optional(),
    otherFood: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.hasAllergy ||
      (data.allergies && data.allergies.length > 0) ||
      (data.otherAllergy && data.otherAllergy.length > 0) ||
      (data.otherDrug && data.otherDrug.length > 0) ||
      (data.otherMedical && data.otherMedical.length > 0) ||
      (data.otherFood && data.otherFood.length > 0),
    {
      message: '알러지 정보를 입력해주세요',
      path: ['allergies'],
    }
  )

// Step 3: Medication
export const medicationDetailSchema = z.object({
  name: z.string().min(1, '약물명을 입력해주세요'),
  dosage: z.string().min(1, '용량을 입력해주세요'),
  frequency: z.string().min(1, '용법을 입력해주세요'),
})

export const medicationSchema = z
  .object({
    hasMedication: z.boolean(),
    medications: z.array(medicationDetailSchema).optional(),
  })
  .refine(
    (data) =>
      !data.hasMedication || (data.medications && data.medications.length > 0),
    {
      message: '약물 정보를 입력해주세요',
      path: ['medications'],
    }
  )

// Step 4: Disease
export const diseaseItemSchema = z.object({
  name: z.string().min(1, '질환명을 입력해주세요'),
})

export const diseaseFormSchema = z
  .object({
    hasDisease: z.boolean().nullable(),
    diseases: z.array(diseaseItemSchema).optional(),
  })
  .refine(
    (data) => {
      if (data.hasDisease === null) return false
      if (data.hasDisease === true) {
        return data.diseases && data.diseases.length > 0
      }
      return true
    },
    {
      message: '질환을 입력해주세요',
      path: ['diseases'],
    }
  )
