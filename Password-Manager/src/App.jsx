import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className={dark ? "dark" : ""}>
          <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-black dark:text-white">

            <Navbar
              toggleDark={() => setDark(!dark)}
              signOut={signOut}
              user={user}
            />

            <div className="flex-grow">
              <Manager user={user} />
            </div>

            <Footer />
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;