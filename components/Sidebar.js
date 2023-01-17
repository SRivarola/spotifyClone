import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useSpotify from '@/hooks/useSpotify'
import SidebarButton from './SidebarButton'
import { AiOutlineHome } from "react-icons/ai";

const Sidebar = () => {

    const spotifyApi = useSpotify()
    const { data: session } = useSession()
    const [ playlists, setPlaylists ] = useState([])

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists()
                .then((data) => {
                    setPlaylists(data.body.items)
                })
        }
    }, [session, spotifyApi])

  return (
    <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] sm:min-w-[8rem] lg:max-w-[15rem] lg:min-w-[10rem] hidden md:inline-flex pb-28'>
        <div className='space-y-4'>
            <SidebarButton children={<AiOutlineHome className='h-5 w-5'/>} label='Home' />
        </div>
    </div>
  )
}
export default Sidebar