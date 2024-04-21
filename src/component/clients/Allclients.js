import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchclients, removeclient } from "./clientSlice.js";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import { Link, useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { fetchorders } from "../orders/orderSlice.js";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Allclients() {
    const clients = useSelector(state => state.clients.clients);
      const orders = useSelector(state => state.orders.orders);
    const deleteClient=(idClient)=>{
    }
  const nav=useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpansion = () => {
      setExpanded((prevExpanded) => !prevExpanded);
    };
   
    return (
      <div >  
        {clients && clients.map((client, index) => (
          <div key={client.id}>
            <Accordion
              expanded={expanded}
              onChange={handleExpansion}
              sx={{
                padding:'5px',margin:'1px',
                '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
              }}
            >
              <AccordionDetails>
             </AccordionDetails>
            </Accordion>
                     <Accordion>
            <div> 

              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >        

               <Tooltip title="לכל ההזמנות " >
              <IconButton sx={{ p: 0 }}> 
                <MoreVertIcon sx={{ p: 0 }}/>
              </IconButton>
                </Tooltip>
               <Typography  >           {client.firstName} {client.lastName}</Typography>
              </AccordionSummary>

              </div>
             
              <AccordionDetails>
                <Typography>
              <Typography>
                  {":פרטים אישיים"}
                  <Typography gutterBottom variant="h5" component="div">
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {client.phone} <LocalPhoneIcon/>
                    <br/>
                    {client.email} <EmailIcon/>
                    <br/>
                    {client.address} <RoomIcon/>
                    <br/>
                    <Button onClick={()=>nav('/allOrder',{state:{client:client.id}})}> לכל ההזמנות </Button>
                  </Typography>
                </Typography>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    );
}
