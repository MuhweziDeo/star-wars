export enum Actions {
    SHOW_LOADER= "SHOW_LOADER"
}

interface ShowLoaderAction {
    type: typeof Actions.SHOW_LOADER,
    loading: boolean
}

export type LoaderActionTypes = ShowLoaderAction

export  const showLoader = (loading: boolean) => ({type: Actions.SHOW_LOADER, loading});