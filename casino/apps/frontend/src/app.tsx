import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homePage";

export function App() {
  return (
    // <UserAuthenticationContextProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
    // </UserAuthenticationContextProvider>
  );
}
