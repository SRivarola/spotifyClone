import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import useSpotify from '@/hooks/useSpotify'
import Image from 'next/image'
import { BiChevronDown } from "react-icons/bi"
import SongsList from './SongsList'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

const Center = () => {

  const { data: session } = useSession()
  const spotifyApi = useSpotify()

  const [color, setColor] = useState(null)
  const [playlist, setPlaylist] = useState([])

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [])

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide text-white">
      <header className='absolute top-5 right-8'>
        <div onClick={signOut} className='flex items-center bg-black space-x-3 opacity-80 hover:opacity-90 cursor-pointer rounded-full p-1 pr-2'>
          {
            session && (<>
              <img className='rounded-full' width={40} height={40} src={session?.user.image} alt='profilePicture' />
              <h2>{session?.user.name}</h2>
              <BiChevronDown className='h-5 w-5' />
            </>)
          }
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
        <img className='h-44 w-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt='track image'/>   
        <div>
          <p>PLAYLIST</p>
          <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
        </div>
      </section>
      
      <SongsList />
    </div>
  )
}
export default Center