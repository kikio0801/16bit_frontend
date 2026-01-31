import { Hospital, PersonProfile } from './types'

export const mockHospitals: Hospital[] = [
  {
    id: 1,
    name: '서울직산자병원 응급실',
    distance: '0.4km',
    address: '서울특별시 중구 세종대로 110',
    emergencyBeds: 2,
    availableBeds: 1,
    totalBeds: 3,
    top: '40%',
    left: '45%',
    markerImage: '/assets/markers/pin-hospital-a.png',
  },
  {
    id: 2,
    name: '강북삼성병원 응급실',
    distance: '0.8km',
    address: '서울특별시 종로구 새문안로 29',
    emergencyBeds: 2,
    availableBeds: 3,
    totalBeds: 3,
    top: '30%',
    left: '20%',
    markerImage: '/assets/markers/pin-hospital-b.png',
  },
  {
    id: 3,
    name: '강동경희대학교병원',
    distance: '1.2km',
    address: '서울 중구 을지로 30',
    emergencyBeds: 4,
    availableBeds: 1,
    totalBeds: 3,
    top: '55%',
    left: '70%',
    markerImage: '/assets/markers/pin-hospital-c.png',
  },
]

export const unavailableHospitals: Hospital[] = [
  {
    id: 4,
    name: '강북삼성병원 응급실',
    distance: '1.0km',
    address: '서울특별시 종로구 새문안로 29',
    emergencyBeds: 0,
    availableBeds: 0,
    totalBeds: 0,
    top: '0%',
    left: '0%',
    status: 'full',
  },
  {
    id: 5,
    name: '강북삼성병원 응급실',
    distance: '1.0km',
    address: '서울특별시 종로구 새문안로 29',
    emergencyBeds: 0,
    availableBeds: 0,
    totalBeds: 0,
    top: '0%',
    left: '0%',
    status: 'closed',
  },
]

export const people: PersonProfile[] = [
  {
    id: 'nampyeon',
    name: '남편',
    tags: '회사・배우자',
    avatar: '/assets/profiles/profile-default.svg',
  },
  {
    id: 'kimsua',
    name: '김수아',
    tags: '자녀',
    avatar: '/assets/profiles/profile-gangsua.svg',
  },
]
