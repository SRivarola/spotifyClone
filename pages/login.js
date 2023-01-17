import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
import Logo from 'https://links.papareact.com/9xl'

const Login = ({providers}) => {
  return (
    <div className='flex flex-col items-center justify-center bg-black min-h-screen w-full'>
        <Image width={52} src={Logo} alt='spotifyLogo' />
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