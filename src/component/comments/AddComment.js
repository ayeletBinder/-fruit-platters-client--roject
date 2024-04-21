import { Button, Rating, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "./commentSlice";
import '../style.css';
import { render } from "@testing-library/react";
import { fetchtrays } from "../trays/traySlice";
import { useLocation, useNavigate } from "react-router";
import {AddCommentToStore} from './commentSlice'

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

const AddComment = (state) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imageimage, setImage] = useState('');
  const [valueRating, setValueRating] = useState(5);
  const [response, setResponse] = useState('');

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

  const location = useLocation();
  const dispatch = useDispatch();
  const trays = useSelector(state => state.trays.trays);
  const clientId = useSelector(state => state.clients.clientId);
  const  nav=useNavigate();


   const AddNewComment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formD=new FormData()
    formD.append('FilelImage', imageimage);
    const response = formData.get('response');
    formD.append('response', response);
    const Rating = formData.get('rating');
    formD.append('rating', Rating);
    formD.append('clientId', 1);//clientId
    formD.append('image', imageimage.name);
    formD.append('trayId', location.state.id);
    try {
      const response = await fetch('https://localhost:7262/api/Comment', {
        method: 'POST',
        body: formD,
      });
      if (response.ok) {
        formD.append('image',selectedImage)
        dispatch(AddCommentToStore(formD))
        const data = await response.json();
        console.log('Response from server:', data);
alert("התגובה נשמרה במערכת");
nav('/')
      } else {
        console.error('Server responded with an error:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <form onSubmit={AddNewComment} >
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
          העלאת תמונה
          <VisuallyHiddenInput type="file" onChange={handleFileInputChange} />
        </Button>
        <div sx={{ marginTop: 2 }}>
          <TextField
            sx={{width:'500px', maxHeight: '300px' }}
            label="תגובה"
            multiline
            rows={3}
            name="response"
          />
          <img src="" alt="" />
          {selectedImage && <img name="Image" src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '250px' }} />}
        </div>
        <div>
          <Rating defaultValue={0} size="medium" name="rating"  onChange={e=>setValueRating(e.value)} sx={{  marginTop: 2 }} /><br />
        </div>
        <div>
          <Button sx={{ marginTop: 2 }} type="submit" variant="contained" color="primary">אישור</Button>
        </div>
      </div>
    </form>
  );
};

export default AddComment;


