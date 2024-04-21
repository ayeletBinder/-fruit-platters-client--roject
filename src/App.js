import Allclients from './component/clients/Allclients.js';
import Allcomments from './component/comments/Allcomments.js';
import ResponsiveAppBar from './component/navbar.js';
import { Route, Routes } from 'react-router';
import SignUp from './component/clients/SignUp.js';
import SignIn from './component/clients/signIn.js';
import Alltrays from './component/trays/Alltrays.js';
import AddTray from './component/trays/addTray.js';
import { fetchorders } from './component/orders/orderSlice.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddComment from './component/comments/AddComment.js'
import Home from './component/home.js';
import Allfruits from './component/fruits/AllFruits.js';
import Footer from './component/f.js';
import BasicList from './personal_area.js';
import Next from './component/next.js'
import { fetchclients } from './component/clients/clientSlice.js';
import { fetchtrays } from './component/trays/traySlice.js';
import { fetchfruits } from './component/fruits/fruitSlice1.js';
import  Edit  from './component/fruits/Edit.js';
import MyOrderTrue from './component/orders/myOrderTrue.js';
import { fetchcomments } from './component/comments/commentSlice.js';
import EndOrder from './component/orders/addOrder/endOrder.js';
import SpecificComment from './component/trays/specificComment.js';
import Allorders from './component/orders/allorders.js';
import DetailsTray from './component/trays/DetailsTray.js';


function App() {
  const dispatch=useDispatch();
  const clients = useSelector(state => state.clients.clients);
  const statusclients = useSelector(state => state.clients.status);
  const orders = useSelector(state => state.orders.orders);
  const statusorders = useSelector(state => state.orders.status);
  const trays = useSelector(state => state.trays.trays);
  const statustrays = useSelector(state => state.trays.status);
  const fruits = useSelector((state) => state.fruits.fruits);
  const statusfruits = useSelector((state) => state.fruits.status);
  let comments = useSelector(state => state.comments.comments);
  const statusComments = useSelector(state => state.comments.status);
  useEffect(() => {
    if (statusComments !== 'fulfilled') {
      dispatch(fetchcomments());
    }
    if ( statusclients !== 'fulfilled') {
      dispatch(fetchclients());
    }
    if ( statusorders !== 'fulfilled') {
    dispatch(fetchorders());
    }
    if ( statustrays !== 'fulfilled') {
    dispatch(fetchtrays());
    }
    if ( statusfruits !== 'fulfilled') {
    dispatch(fetchfruits())
    }

  }, [clients,orders,comments,trays, fruits,dispatch]);

      const admin = useSelector(state => state.clients.admin);
      const idClient = useSelector(state => state.clients.id);
  return (
    <div className="App">
     <ResponsiveAppBar/>
     <main style={{ minHeight: "800px" }}>

      <Routes> 
      <Route path='AddComment' element={ <AddComment idClient={idClient}/>} />    
       <Route path='/' element={<Home/>} />
          <Route path='SignUp' element={<SignUp/>} />
         <Route path='SignIn' element={<SignIn/>} />
         <Route path='MyOrderTrue' element={<MyOrderTrue />} /> 
         {admin&&<Route path='clients' element={<Allclients orders="orders"/>} /> } 
         <Route path='allOrder' element={<Allorders/>} /> 
         {admin&&<Route path='Allfruits' element={<Allfruits/>} /> }
         {<Route path='Alltrays' element={<Alltrays trays={trays} />} /> }
         <Route path='/endOrder' element={<EndOrder/>} /> 
         <Route path="comments" element={<Allcomments admin="admin"/>}/>
         <Route path="SpecificComment" element={<SpecificComment />}/>
         <Route path='trays' element={<AddTray/>} /> 
         <Route path='/next' element={<Next/>} /> 
         <Route path='DetailsTray' element={<DetailsTray/>} /> 
         <Route path='BasicList' element={<BasicList id={idClient} sx={{width:' 100px'}}/>} /> 
         <Route path='Edit' element={<Edit/>} /> 
       </Routes>
       </main>
       <Footer/>
    </div>
  );
}

export default App;
