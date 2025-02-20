import { ProfileProvider } from "@/context/ProfileContext"
import { ProfilePage } from "@/components/profile-page"

export default function Home() {
  return (
    <ProfileProvider>
      <ProfilePage />
    </ProfileProvider>
  )
}

