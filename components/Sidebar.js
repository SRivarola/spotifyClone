import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useSpotify from '@/hooks/useSpotify'
import SidebarButton from './SidebarButton'
import { AiOutlineHome, AiOutlineSearch, AiOutlinePlusCircle, AiFillHeart } from "react-icons/ai"
import { HiOutlineLibrary } from "react-icons/hi"
import { BiRss } from "react-icons/bi"

const Sidebar = () => {

    const spotifyApi = useSpotify()
    const { data: session } = useSession()
    const [ playlists, setPlaylists ] = useState([])
    const [ playlistId, setPlaylistId ] = useState([])

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
            <SidebarButton children={<AiOutlineSearch className='h-5 w-5'/>} label='Search' />
            <SidebarButton children={<HiOutlineLibrary className='h-5 w-5'/>} label='Your Library' />
            <hr className='border-t-[0.1px] border-gray-900' />
            <SidebarButton children={<AiOutlinePlusCircle className='h-5 w-5'/>} label='Create List' />
            <SidebarButton children={<AiFillHeart className='h-5 w-5'/>} label='Liked Song' />
            <SidebarButton children={<BiRss className='h-5 w-5'/>} label='Your Episodes' />
            <hr className='border-t-[0.1px] border-gray-900' />

            {/* Playlist */}
            {
                playlists.map((playlist) => (
                    <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white'>{playlist.name}</p>
                ))
            }
        </div>
        
    </div>
  )
}
export default Sidebar