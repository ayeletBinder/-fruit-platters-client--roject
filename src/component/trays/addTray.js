import { Button, Checkbox, FormControlLabel, List, ListItem, ListItemAvatar, ListItemText, Rating, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from "react-redux";
import { addTrayToReducer, addtray } from "./traySlice";
import '../style.css';
import { render } from "@testing-library/react";
import { fetchtrays } from "../trays/traySlice";
import { useLocation, useNavigate } from "react-router";
import {AddtrayToStore} from './traySlice'
import { Padding } from "@mui/icons-material";
import "./../style.css"
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const TraySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'name must be at least 4 characters')
    .max(20, 'name cannot exceed 20 characters')
    .required('name is required'),

    description: Yup.string()
    .min(4, 'description must be at least 4 characters')
    .required('description is required'),

    price: Yup.number()
    .required('price is required'),

    size:Yup.number()
    .required('size is required'),


});


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AddTray = (state) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imageimage, setImage] = useState('');
  const [valueRating, setValueRating] = useState(5);

  const handleFileInputChange = (e) => {
      const selectedFile = e.target.files[0];
      setImage(selectedFile)
      const formData = new FormData();
      formData.append('Image', selectedFile);
      setFile(formData);
      const reader = new FileReader();
      reader.onload = () => {
          setSelectedImage(reader.result);
      };

      if (selectedFile) {
          reader.readAsDataURL(selectedFile);
      }
  };

const  nav=useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const trays = useSelector(state => state.trays.trays);
  const fruits = useSelector(state => state.fruits.fruits);
  const clientId = useSelector(state => state.clients.clientId);



  const AddNewtray = async (event) => {
    console.log("fruits in ttray",addToSelectedFruits);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formD=new FormData()
    const description = formData.get('description');
    const name = formData.get('name');
    const price = formData.get('price');
    const size = formData.get('size');
    formD.append('FilelImage', imageimage);
    formD.append('description', description);
    formD.append('name', name);
    formD.append('price', price);
    formD.append('size', size);
    formD.append('image', imageimage.name);
    addToSelectedFruits.forEach(fruit=>{formD.append('fruitsId[]', fruit);})
    
    try {
      const response = await fetch('https://localhost:7262/api/Tray', {
        method: 'POST',
        body: formD,
      });
      if (response.ok) {
        formD.append('image',selectedImage)
        dispatch(addTrayToReducer(formD))
        const data = await response.json();
        console.log('Response from server:', data);
        alert('המגש נוסף בהצלחה')
      } else {
        console.error('Server responded with an error:', response.statusText);
        alert("המגש נוסף בהצלחה")
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };
  console.log(fruits,"fruits")
  const [isChecked, setIsChecked] = useState(); 
  const [addToSelectedFruits,setAddToSelectedFruits] =useState([])


  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const fruitId = Number(event.target.id); 
  
    setAddToSelectedFruits((prevFruits) => {
      if (isChecked) {
        return [...prevFruits, fruitId];
      } else {
        return prevFruits.filter((fruit) => fruit !== fruitId);
      }
    });
  };
  const formik = useFormik({
    initialValues: { name: '',size:'',description:'', price: ''},
    validationSchema: TraySchema,
    onSubmit: (values) => {
      console.log('Submitted values:', values);
    },
  });
  return (
    <form onSubmit={AddNewtray} >
      <div className="divAdd" style={{
            border: '1px solid orange',
            borderRadius: '4px',
            textAlign:'center',
            margin: '16px',
            width:'95%'
          }}>
        <Button
          sx={{ marginTop: 2 }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          
        >
העלאת תמונה          <VisuallyHiddenInput type="file" onChange={handleFileInputChange} />
        </Button>
        <div sx={{ marginTop: 2 }}>
        <TextField  label="שם"
            multiline
            name="name"                  {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <div className='error'>{formik.errors.name}</div>
            )}
           
            <br/>
          <TextField
            sx={{width:'500px', maxHeight: '300px' }}
            label="תאור"
            multiline
            rows={3}
            name="description"
            {...formik.getFieldProps('description')}
            />
            {formik.touched.description && formik.errors.description && (
              <div className='error'>{formik.errors.description}</div>
            )}
                      <br/>

          <img src="" alt="" />
          {selectedImage && <img name="Image" src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '250px' }} />}
          <br/>



            <TextField sx={{margin:"2px"}} label="מחיר"
            name="price"
            variant="outlined"
            inputProps={{ type: "number" }}                  {...formik.getFieldProps('price')}
            />
            {formik.touched.price && formik.errors.price && (
              <div className='error'>{formik.errors.price}</div>
            )}

            <TextField  label="גודל"
            name="size"
            variant="outlined"
            inputProps={{ type: "number" }}                  {...formik.getFieldProps('size')}
            />
            {formik.touched.size && formik.errors.size && (
              <div className='error'>{formik.errors.size}</div>
            )}
                        <br/>

        </div>
        <h4>  בחירת פירות</h4>        

        <div style={{display:'flex',flexWrap: 'wrap'}}>
        {fruits?.map(fruit => <>
        <List  sx={{ width: '100%', maxWidth: 360 ,}}>
      <ListItem >
        <FormControlLabel
          control={<Checkbox id={fruit.id} checked={isChecked} onChange={handleCheckboxChange} />}
          label={
            <ListItemAvatar>
              <img src={fruit.image} alt={fruit.name} style={{ width: '50px', height: '50px', borderRadius: '50%',objectFit:"cover" }} />
            </ListItemAvatar>
          }
        />
        <ListItemText primary={fruit.name} />
      </ListItem>
    </List>
        </>)}
        </div>
        <div>
          <Button sx={{ marginTop: 2 }} type="submit" variant="contained" color="primary" >אישור</Button>
        </div>

      </div>
    </form>
  );
};

export default AddTray;
