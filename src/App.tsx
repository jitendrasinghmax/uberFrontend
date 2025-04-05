import { RideProvider } from "./context/rideContext"
import { SocketProvider } from "./context/socketContext"
import { UserContextProvider } from "./context/userContext"
import { Layout } from "./layout/Layout"

function App() {

  return (
    <>
      <RideProvider>
        <SocketProvider>
          <UserContextProvider>
            <Layout />
          </UserContextProvider>
        </SocketProvider>
      </RideProvider>
    </>
  )
}

export default App
