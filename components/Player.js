import { useSession } from "next-auth/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { debounce } from "lodash"
import useSongInfo from "@/hooks/useSongInfo"
import useSpotify from "@/hooks/useSpotify"
import { SpotifyContext } from "@/context/spotifyContext"

const Player = () => {

  const spotifyApi = useSpotify()
  const songInfo = useSongInfo()
  const {data: session} = useSession()

  const { trackId, isPlaying } = useContext(SpotifyContext)

  const [volume, setVolume] = useState(50)



  return (
    <div className="h-24 bg-gradient-to-b from-black to bg-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">Player</div>
  )
}
export default Player