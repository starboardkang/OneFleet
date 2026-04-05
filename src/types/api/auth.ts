export type LoginRequest = {
  email: string
  password: string
}

export type AuthTokenResponse = {
  accessToken: string
  refreshToken?: string
  expiresIn: number
}
