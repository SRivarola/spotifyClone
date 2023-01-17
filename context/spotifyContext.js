import { useState, createContext } from "react"

export const SpotifyContext = createContext()

const SpotifyContextProvider = ({children}) => {

    const [playlist, setPlaylist] = useState([])
    const [playlistId, setPlaylistId] = useState('4LnTQT9pZuyXG96WS9RNzU')

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