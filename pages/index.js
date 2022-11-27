import Head from 'next/head'
import Header from '../components/Header'
import { getSession } from "next-auth/react"
import Login from '../pages/auth/signin'

export default function Home({session}) {
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      <main>
        
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