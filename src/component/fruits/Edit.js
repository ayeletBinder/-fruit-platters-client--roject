import { Alert, Button, Checkbox, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../style.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchfruits , addFruit } from './fruitSlice1';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { isExists } from 'date-fns';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useLocation } from 'react-router';

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
export default function Edit() {
 
  const [selectedImage, setSelectedImage] = useState(null);
const [file, setFile] = useState(null);
  let [isFruitExist,setIsFruitExist]=useState(false);
  const fruits = useSelector((state) => state.fruits.fruits);
  let dispatch=useDispatch();
  const updateFruit =async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const formD=new FormData()
     let fruit = fruits.filter(x=>x.name===data.get('name')&& x.color===data.get('color'))                       
    if(fruit.length===0){
     let IsExist = event.currentTarget.elements['isExist'].checked;

    try {
      const response = await fetch(
        `https://localhost:7262/api/Fruit/${location.state?.fruitId}`, // Use template literal with fruit ID
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: 1,
            name: location.state?.fruitName,
            color: location.state?.fruitColor,
            someAdditional: price,
            isExists: IsExist,
            image: imageimage=="null"?undefined:imageimage
          }),
        }
      ); 
    } catch (error) {
      console.error('Error sending PUT request:', error);
    }
  }
  else{
      setIsFruitExist(true);
  }
};



const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile.name)
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
    const location = useLocation();
    const fruit = location.state?.fruitId;
  useEffect(() => {
    console.log('in edit');
  }, []);
  const [isChecked, setIsChecked] = useState(location.state?.fruitIsExists);
  const [price,setPrice]=useState(location.state?.fruitSomeAdditional)
  let [imageimage,setImage]=useState( location.state?.fruitImage||null);
  return (
    <form onSubmit={updateFruit}>
<div className='divFruit'>
<Grid item xs={12} sm={6}>
<Button
sx={{ marginTop: 2 }}
component="label"
role={undefined}
variant="contained"
tabIndex={-1}
startIcon={<CloudUploadIcon />}

>
Upload file
<VisuallyHiddenInput type="file" onChange={handleFileInputChange} />
</Button>
     <p>{location.state?.fruitName}  {location.state?.fruitColor?location.state?.fruitColor:" "}</p>
    </Grid>
<Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        id="price"
        onChange={event=>setPrice(event.target.value)}
        placeholder={location.state?.fruitSomeAdditional?location.state?.fruitSomeAdditional:0}
        label="מחיר נוסף"
        name="price"
        type='number'
        autoComplete="family-name"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
  <Checkbox id='isExist' name='isExist' 
  checked={isChecked}
  onChange={event=>setIsChecked(event.target.checked)}
  /> ?האם קיים  
    </Grid>
    {selectedImage && <img name="image" src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '250px' }} />}

<Button sx={{marginTop:2}}  type="submit" variant="contained" color="primary">לעדכן</Button> 
<Button sx={{marginTop:2}} onClick={()=>{}} type="cancel" variant="contained" color="primary">ביטול</Button> </div>
</form>
    )
}
