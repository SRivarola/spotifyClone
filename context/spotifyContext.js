import { useState, createContext, useEffect } from "react"
import spotifyApi from "@/lib/spotify"

export const SpotifyContext = createContext()

const SpotifyContextProvider = ({children}) => {

    const [playlist, setPlaylist] = useState()
    const [playlistId, setPlaylistId] = useState('4LnTQT9pZuyXG96WS9RNzU')

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId)
            .then((data) => {
                setPlaylist(data.body)
            })
            .catch((err) => console.log('Something went wrong! ', err))
    }, [spotifyApi, playlistId])

    return (
        <SpotifyContext.Provider value={{
            playlist,
            setPlaylist,
            playlistId,
            setPlaylistId,
        }} >
            {children}
        </SpotifyContext.Provider>
    )
}

export default SpotifyContextProvider