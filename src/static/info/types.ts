import type { LucideIcon } from 'lucide-react'

export type SocialLink = {
	url: string
	icon: LucideIcon
}

export type EducationEntry = {
    year: string
	grade: string
    location: string
	institute: string
	icon: LucideIcon
}

export type Education = {
	"10th": EducationEntry
    "12th": EducationEntry
	"College": EducationEntry
}

export type Introduction = {
    name: string
    role: string
    about: string
}