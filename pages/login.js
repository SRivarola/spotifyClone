import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
import Logo from '../public/spotifyLogo.png'

const Login = ({providers}) => {
    console.log(providers)
  return (
    <div className='flex flex-col items-center justify-center bg-black min-h-screen w-full'>
        <Image width={208} src={Logo} alt='spotifyLogo' />
        {
            Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button 
                        className='mt-5 bg-[#18d860] text-white font-semibold p-4 rounded-full'
                        onClick={() => signIn(provider.id, { callbackUrl: '/'})}    
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))
        }
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