export interface UserProfile {
  elderName: string
  disease: string
  allergy: string
  medications: string
  address: string
  hospital: string
  hospitalTel: string
  contacts: { name: string; tel: string }[]
}

const KEY = 'ep_profile'

export function loadProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function saveProfile(p: UserProfile): void {
  localStorage.setItem(KEY, JSON.stringify(p))
}

export function clearProfile(): void {
  localStorage.removeItem(KEY)
}

export const EMPTY_PROFILE: UserProfile = {
  elderName: '', disease: '', allergy: '', medications: '',
  address: '', hospital: '', hospitalTel: '',
  contacts: Array(6).fill(null).map(() => ({ name: '', tel: '' }))
}
