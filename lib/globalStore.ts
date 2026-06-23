import { pickBy } from "lodash"
import { create } from "zustand"

interface GlobalState {
    fullScreenMap: Record<string, boolean>
    setFullScreenMap: (pathname: string, isFllScreen: boolean) => void
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
    fullScreenMap: {},
    setFullScreenMap: (pathname: string, isFllScreen: boolean) => {
        const {fullScreenMap} = get()
        const _fullScreenMap = {...fullScreenMap, [pathname]: isFllScreen}
        set({fullScreenMap: pickBy(_fullScreenMap, value => !!value)})
    }
}))