import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'

const Login = ({providers}) => {
  return (
    <div className='flex flex-col items-center justify-center bg-black min-h-screen w-full'>
        <Image className='w-52 mb-5' src='https://links.papareact.com/9xl' alt='spotifyLogo' />
    </div>
  )
}
export default Login

export async function getServerSideProps(){

    const providers = await getProviders()

    return {
        props: {
            providers,
        }
    }
}