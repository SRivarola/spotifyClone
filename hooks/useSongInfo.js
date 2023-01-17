import { SpotifyContext } from "@/context/spotifyContext"
import { useContext, useEffect, useState } from "react"
import useSpotify from "./useSpotify"


const useSongInfo = () => {

    const spotifyApi = useSpotify()
    const { trackId } = useContext(SpotifyContext)
    const [songInfo, setSongInfo] = useState(null)
    
    useEffect(() => {
        const fetchSongInfo = async () => {
            if(trackId){
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }).then( res => res.json())

                setSongInfo(trackInfo)
            }
        }

        fetchSongInfo()
    }, [trackId, spotifyApi])

    return songInfo
}
export default useSongInfo