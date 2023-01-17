import { SpotifyContext } from "@/context/spotifyContext"
import { useContext } from "react"
import Song from "./Song"

const SongsList = () => {

  const { playlist } = useContext(SpotifyContext)

  return (
    <div className="px-4 md:px-8 flex flex-col space-y-1 text-white pb-28">
      {
        playlist?.tracks.items.map((track, i) => (
          <Song key={track.track.id} track={track} order={i} />
        ))
      }
    </div>
  )
}
export default SongsList