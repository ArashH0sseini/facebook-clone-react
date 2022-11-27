import React from 'react'
import Image from 'next/image'
import { getProviders, signIn as SignIntoProvider } from 'next-auth/react'


function signIn({ providers }) {
    console.log(providers)
    return (
        <div className='grid place-items-center'>
            <Image
                src="https://links.papareact.com/t4i"
                height={400}
                width={400}
                objectFit="contain"
                alt=''
            />
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button className='p-5 bg-blue-500 rounded-full 
                    text-white text-center cursor-pointer' onClick={() => SignIntoProvider(provider.id, { callbackUrl: '/' })}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}
export default signIn;

export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}
