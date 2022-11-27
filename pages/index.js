import Head from 'next/head'
import Header from '../components/Header'
import { getSession } from "next-auth/react"
import Login from '../pages/auth/signin'
import Sidebar from '../components/Sidebar'

export default function Home({session}) {
  return (
    <div className='h-screen bg-gray-100 overflow-hidden'>
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      <main className='flex'>
        <Sidebar />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session
    }, 
  }
}