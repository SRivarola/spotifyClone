import { useEffect } from 'react'
import { getSession, useSession } from 'next-auth/react'
import Router from 'next/router'
import Center from '@/components/Center'
import Player from '@/components/Player'
import Sidebar from '@/components/Sidebar'
import Head from 'next/head'

export default function Home() {

  const {data: session} = useSession()

  useEffect(() => {
    if(!session){
      Router.push('/login')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black h-screen overflow-hidden">
        {
          session && (<>
            <main className='flex'>
              <Sidebar />
              <Center />
            </main>

            <div className='sticky bottom-0'>
              <Player />
            </div>
          </>)
        }
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}