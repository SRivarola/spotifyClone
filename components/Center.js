import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import useSpotify from '@/hooks/useSpotify'
import Image from 'next/image'
import { BiChevronDown } from "react-icons/bi"

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
  const image = session?.user.image

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
          <Image className='rounded-full' width={40} height={40} src={image} alt='profilePicture' />
          <h2>{session?.user.name}</h2>
          <BiChevronDown className='h-5 w-5' />
        </div>
      </header>
    </div>
  )
}
export default Center