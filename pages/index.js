import Head from 'next/head'
import Header from '../components/Header'
import { getSession } from "next-auth/react"
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widgets from '../components/Widgets'


export default function Home({ session }) {

  return (
    <div className='h-screen bg-gray-200 overflow-hidden'>
      <Head>
        <title>Facebook</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header />

      <main className='flex'>
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}