import { store } from './app/store'
import { loadUserAsync } from './features/auth/authThunk'

export const sessionData = () => {

    if (store.getState().auth.username !== '' && store.getState().auth.username !== 'undefined') return ''
    
    const deleteCookies = () => {
        document.cookie = `path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        document.cookie = `expires=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    }

    const sessionJWT = document.cookie === '' ? '' : document.cookie.match(/token=([^;]+)/)[1]
    const sessionJWTExpiry = document.cookie === '' ? '' : document.cookie.match(/expires=([^;]+)/)[1]

    const nowTime = new Date()
    const expiryTime = new Date(sessionJWTExpiry)

    if (sessionJWT === '' || sessionJWTExpiry === '' || nowTime > expiryTime) return deleteCookies()

    store.dispatch(loadUserAsync(sessionJWT))

    return true
}