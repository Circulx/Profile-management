"use server"

import dbConnect from "@/lib/mongodb"
import Profile from "@/models/Profile"

export async function saveProfileSection(section: string, data: any, profileId?: string) {
  try {
    await dbConnect()

    let profile
    if (profileId) {
      // Update existing profile section
      const updateData = { [`${section}`]: data }
      profile = await Profile.findByIdAndUpdate(profileId, { $set: updateData }, { new: true, runValidators: true })
    } else {
      // Create new profile with first section
      profile = await Profile.create({ [section]: data })
    }

    return { success: true, data: profile }
  } catch (error: any) {
    console.error("Profile section save error:", error)
    return { success: false, error: error.message }
  }
}

