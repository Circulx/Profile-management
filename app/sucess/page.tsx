import { SuccessPage } from "@/components/success-page"
import { ProfileProvider } from "@/context/ProfileContext"

export default function Success() {
  return (
    <ProfileProvider>
      <SuccessPage />
    </ProfileProvider>
  )
}

