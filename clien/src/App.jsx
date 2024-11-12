import Layout from "./layout/Layout";
import { ProfileProvider } from "./context/ProfileContext";

function App() {
  return (
    <>
      <ProfileProvider>
        <Layout />
      </ProfileProvider>
    </>
  );
}

export default App;
