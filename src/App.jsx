import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import {logout,login} from './store/authSlice'
import "./App.css";
function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch();
 
  useEffect(()=>{ 
       authService.currentUser()
       .then( 
        (userData)=>{
           if(userData)
           {
            dispatch(login({userData}))
           }
           else{
            dispatch(logout())
           }
        }
       )
       .finally(
        setLoading(false)
       )
  },[])


  return !loading ? (<>
  <div>
    <Header/>
       Todo {/* <Outlet/> */}
    <Footer/>
  </div>
  </>):(null);
}

export default App
