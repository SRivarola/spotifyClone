import spotifyApi from "@/lib/spotify"
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from "react"

const useSpotify = () => {

    const { data: session } = useSession()

    useEffect(() => {
        if(session){
            if(session.error === 'RefreshAccessTokenError'){
                signIn()
            }

            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session])

  return spotifyApi
}
export default useSpotify