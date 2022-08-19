import '../styles/globals.css'
import Auth0Provider from "next-auth/providers/auth0"

function MyApp({ Component, pageProps }) {
  return (

    <Auth0Provider session={pageProps.session}>
      
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default MyApp
