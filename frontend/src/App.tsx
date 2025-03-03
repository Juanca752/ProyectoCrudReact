import "./App.css";
import FormLogin from "./components/formLogin";
import ListUsers from "./components/listUsers";

import { useAuth } from "./components/auth";
function App() {
  const { token } = useAuth();
  return (
    <div className="absolute top-0 z-[-2]  h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="flex items-center justify-center h-screen ">
        {token ? <ListUsers /> : <FormLogin />}
      </div>
    </div>
  );
}

export default App;
