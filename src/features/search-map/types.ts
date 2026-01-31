export type PersonProfile = {
  id: string
  name: string
  tags: string
  avatar: string
}

export type Hospital = {
  id: number
  name: string
  distance: string
  address: string
  emergencyBeds: number
  availableBeds: number
  totalBeds: number
  // Using percentages for static map positioning
  top: string
  left: string
  markerImage?: string
  status?: 'available' | 'full' | 'closed'
}

export interface SheetMetrics {
  isDragging: boolean
  startY: number
  currentY: number
  isMinimized: boolean
}
