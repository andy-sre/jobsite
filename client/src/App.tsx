import Landing from "./pages/Landing";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Error from "./pages/Error";
import {AllJobs, Profile, SharedLayout, Stats, AddJob} from './pages/dashboard'
import {ProtectedRoute} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={
                <ProtectedRoute>
                    <SharedLayout/>
                </ProtectedRoute>
            }>
                <Route index element={<Stats/>}/>
                <Route path={"/all-jobs"} element={<AllJobs/>}/>
                <Route path={"/add-job"} element={<AddJob/>}/>
                <Route path={"/profile"} element={<Profile/>}/>
            </Route>
            <Route path={"/landing"} element={<Landing/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"*"} element={<Error/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
