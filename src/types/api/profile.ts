export type RequesterProfileDto = {
  fullName: string
  office: string
  email: string
  contactNumber: string
  employeeId: string
  address: string
  avatarUrl?: string | null
}

export type UpdateRequesterProfileRequest = Omit<RequesterProfileDto, 'avatarUrl'> & {
  avatarUrl?: string | null
}
