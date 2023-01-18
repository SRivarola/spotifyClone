import { useSession } from "next-auth/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { debounce } from "lodash"
import useSongInfo from "@/hooks/useSongInfo"
import useSpotify from "@/hooks/useSpotify"
import { SpotifyContext } from "@/context/spotifyContext"
import { HiSwitchHorizontal, HiRewind, HiPlay, HiPause, HiFastForward, HiReply, HiVolumeUp, HiOutlineVolumeUp } from "react-icons/hi";

const Player = () => {

  const spotifyApi = useSpotify()
  const songInfo = useSongInfo()
  const {data: session} = useSession()

  const { trackId, isPlaying, setIsPlaying, setTrackId } = useContext(SpotifyContext)

  const [volume, setVolume] = useState(50)

  const fetchCurrentSong = () => {
    if(!songInfo){
        spotifyApi.getMyCurrentPlayingTrack()
          .then( data => {
            setTrackId(data.body?.item?.id)
            spotifyApi.getMyCurrentPlaybackState()
            .then( data => {
              setIsPlaying(data.body?.is_playing)
            })
          })
    }
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState()
      .then( data => {
        if(data.body.is_playing){
          spotifyApi.pause()
          setIsPlaying(false)
            } else {
                spotifyApi.play()
                setIsPlaying(true)
            }
        })
  }

  const debounceAdjustVolume = useCallback(debounce(volume => {
        spotifyApi.setVolume(volume).catch(err => {})
    }, 500), []
  )

  useEffect(() => {
    if(spotifyApi.getAccessToken() && !trackId){
      fetchCurrentSong()
      setVolume(50)
    }
  }, [trackId, spotifyApi, session])

  useEffect(() => {
    if(volume > 0 && volume < 100){
      debounceAdjustVolume(volume)
    }
  }, [volume]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to bg-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt="song album image" />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <HiSwitchHorizontal className="button" />
        <HiRewind 
          // onClick={() => spotifyApi.skipToPrevius()} api isnt work
          className="button" 
        />
        {
          isPlaying ? (
            <HiPause onClick={handlePlayPause} className="button w-10 h-10"/>
          ) : (
            <HiPlay onClick={handlePlayPause} className="button w-10 h-10"/>
          )
        }
        <HiFastForward 
          // onClick={() => spotifyApi.skipToNext()} api isnt work
          className="button" 
        />
        <HiReply className="button"/>
      </div>
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
            <HiOutlineVolumeUp onClick={() => volume > 0 && setVolume(volume - 10)} className="button" />
            <input 
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-14 md:w-28" 
                type='range' 
                value={volume} 
                min={0} 
                max={100} 
            />
            <HiVolumeUp onClick={() => volume < 100 && setVolume(volume + 10)} className="button" />
        </div>
    </div>
  )
}
export default Player