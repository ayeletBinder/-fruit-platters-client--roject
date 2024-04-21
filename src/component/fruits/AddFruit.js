import { Alert, Button, Checkbox, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import '../style.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchfruits , addFruit, addfruit1 } from './fruitSlice1';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { isExists } from 'date-fns';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useFormik } from 'formik';

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


export const FruitSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'name must be at least 4 characters')
    .max(10, 'name cannot exceed 20 characters')
    .required('name is required'),

  color: Yup.string()
    .min(2, 'color must be at least 4 characters')
    .max(10, 'color cannot exceed 20 characters'),


  price:Yup.number()
  .required('price is required'),
});


export default function AddFruit(props) {
  let [isFruitExist,setIsFruitExist]=useState(false);
  let [imageimage,setImage]=useState(false);
  const fruits = useSelector((state) => state.fruits.fruits);
  let dispatch=useDispatch();

const AddNewFruit =async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const formD=new FormData()
  let IsExist=false;
     let fruit = fruits[0]?fruits.filter(x=>x.name===data.get('name')&& x.color===data.get('color')) :null;                      
    if(fruit?.length===0){
      if(data.get('isExist')=="on"){
      IsExist=true;
      }
      else{
      IsExist=false;
      }
      formD.append('name',data.get('name'));
      formD.append('color',data.get('color'));
      formD.append('someAdditional',data.get('price'));
      formD.append('isExists',IsExist);
      formD.append('image',imageimage.name);
      formD.append('FilelImage',imageimage||null);

      console.log(formD);
      try {
        const response = await fetch('https://localhost:7262/api/fruit', {
          method: 'POST',
          body: formD,
        });
        if (response.ok) {
          let c=response.data;
          formD.append('image',selectedImage)
          const data = await response.json();
          console.log('Response from server:', data);
          dispatch(addfruit1(formD));
          alert('הפרי נוסף בהצלחה')
           nav('/')
        } else {
          console.error('Server responded with an error:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending POST request:', error);
      }}
  else{
      setIsFruitExist(true);
  }
  // props.withAdd(false);
};

const [selectedImage, setSelectedImage] = useState(null);
const [file, setFile] = useState(null);

const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile)
    const formData = new FormData();
    formData.append('image', selectedFile);
    setFile(formData);
    const reader = new FileReader();
    reader.onload = () => {
        setSelectedImage(reader.result);
    };

    if (selectedFile) {
        reader.readAsDataURL(selectedFile);
    }
};
const nav=useNavigate();
const formik = useFormik({
    initialValues: { name: '',color:'',price:'', image: '' },
    validationSchema: FruitSchema,
    onSubmit: (values) => {
      console.log('Submitted values:', values);
    },
  });
  return (
    <form onSubmit={AddNewFruit}>
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
        {selectedImage && <img name="image" src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '250px' }} />}

<div className='divFruit'>
  <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="שם הפרי"
                  name="name"
                  autoComplete="family-name"
                  {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className='error'>{formik.errors.name}</div>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="color"
                  fullWidth
                  id="color"
                  label="צבע"
                  autoFocus 
                  {...formik.getFieldProps('color')}
                  />
                  {formik.touched.color && formik.errors.color && (
                    <div className='error'>{formik.errors.color}</div>
                  )}
              </Grid>
  <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="מחיר נוסף"
                  name="price"
                  type='number'
                  autoComplete="family-name"
                  {...formik.getFieldProps('price')}
                  />
                  {formik.touched.price && formik.errors.price && (
                    <div className='error'>{formik.errors.price}</div>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
            <Checkbox id='isExist' name='isExist'/> ?האם קיים  
              </Grid>
              {isFruitExist &&<Alert sx={{width:400,justifyContent:"center"}} severity="error">פרי זה קיים במערכת</Alert>}

     <Button sx={{marginTop:2}} type="submit" variant="contained" color="primary">אישור</Button> 
     <Button sx={{marginTop:2}} onClick={()=>{}} type="cancel" variant="contained" color="primary">ביטול</Button> </div>
    </form>
  )
}
