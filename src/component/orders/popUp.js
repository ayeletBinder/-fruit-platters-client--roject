import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateOrderReducer, useOrder } from './orderSlice';
import { useDispatch, useSelector } from 'react-redux';

const PopUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToTheCart } = useOrder();
  const idClient = useSelector(state => state.clients.id);
  const trays = useSelector(state => state.trays.trays);
  const orders = useSelector(state => state.orders.orders);
  const location = useLocation();
  const [tray, setTray] = useState();

  function addToCart() {
    if (!idClient) {
      alert("יש להתחבר למערכת");
    } else {
      addToTheCart(tray.idTray, idClient)
        .then(() => {
          setIsOpen(true); 
        });
    }
  }

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handleGoToCart = async () => {
    setIsOpen(false); 
    await navigate('/MyOrderTrue'); 
  };

  const handleContinueShopping = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const { tray } = location.state;
    setTray(tray);

    if (isOpen) {
      const portal = document.createElement('div');
      portal.id = 'popup-root';
      document.body.appendChild(portal);
      ReactDOM.render(<PopupContent onClose={handleClosePopup} onGoToCart={handleGoToCart} onContinueShopping={handleContinueShopping} />, portal);
    }

    return () => {
      const portal = document.getElementById('popup-root');
      if (portal) {
        ReactDOM.unmountComponentAtNode(portal);
        document.body.removeChild(portal);
      }
    };
  }, [isOpen]);

  return (
    <div>
      <Button variant="contained" onClick={addToCart} sx={{ mt: 3, ml: 1 }}>להוספה לסל</Button>
    </div>
  );
};

const PopupContent = ({ onClose, onGoToCart, onContinueShopping }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      height: '200px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#fff',
      textAlign: 'center',
      boxShadow: '5px 10px 5px rgba(0, 0, 0, 0.3)'
    }}
    >
      <h1>המגש נוסף בהצלחה!</h1>
      <p>המשך קניות או עבור לסל הקניות.</p>
      <Button variant="contained"  onClick={onGoToCart} style={{ marginRight: '10px' }}>לסל הקניות</Button>
      <Button variant="contained" onClick={onContinueShopping}>המשך קניות</Button>

    </div>
  );
};

export default PopUp;