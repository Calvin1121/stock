import { ChinaCode } from "@/utils/country-codes";
import { create } from "zustand";

interface RegisterState {
    countryCode: string
    setCountryCode: (countryCode: string) => void
}

export const useRegisterStore = create<RegisterState>((set) => ({
    countryCode: ChinaCode.code,
    setCountryCode: (countryCode: string) => set({countryCode})
}))