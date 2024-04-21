
import React, { useState } from 'react'; 
import './images.css'
export default function Home() {
  const [isHoveredM, setIsHoveredM] = useState(false);
  const [isHoveredA, setIsHoveredA] = useState(false);
  const [isHoveredN, setIsHoveredN] = useState(false);
  const [isHoveredG, setIsHoveredG] = useState(false);

  const handleMouseEnterM = () => setIsHoveredM(true);
  const handleMouseLeaveM = () => setIsHoveredM(false);

  const handleMouseEnterA = () => setIsHoveredA(true);
  const handleMouseLeaveA = () => setIsHoveredA(false);

  const handleMouseEnterN = () => setIsHoveredN(true);
  const handleMouseLeaveN = () => setIsHoveredN(false);

  const handleMouseEnterG = () => setIsHoveredG(true);
  const handleMouseLeaveG = () => setIsHoveredG(false);

  return (
    <body style={{ height: '100%', width: '100%', color: 'black' }}>
      <div className="image-container" style={{position:'absolute' ,  bottom: '21%',  left:'18vw'}}>
        <img
          style={{
            height:'27vh',
            width:'11vw',
            color: 'red',
            margin:'20px'
            ,objectFit:'contain'
          }}
          src={isHoveredM? "./pictures/M.png" : "./pictures/M לבן.png"}
          onMouseEnter={handleMouseEnterM}
          onMouseLeave={handleMouseLeaveM}
        />
        <img
          style={{
            height:'27vh',
            width:'11vw',
            color: 'red',
            margin:'20px'
            ,objectFit:'contain'
          }}
          src={isHoveredA ? "./pictures/A.png" : "./pictures/Aלבן.png"}
          onMouseEnter={handleMouseEnterA}
          onMouseLeave={handleMouseLeaveA}
        />

        <img
          style={{
            height:'27vh',
            width:'11vw',
            color: 'red',
            margin:'20px'
            ,objectFit:'contain'
          }}
          src={isHoveredN ? "./pictures/N.png" : "./pictures/Nלבן.png"}
          onMouseEnter={handleMouseEnterN}
          onMouseLeave={handleMouseLeaveN}
        />

        <img
          style={{
            height:'27vh',
            width:'11vw',
            color: 'red',
            margin:'20px'
            ,objectFit:'contain'
          }}
          src={isHoveredG ? "./pictures/G.png" : "./pictures/Oלבן.png"}
          onMouseEnter={handleMouseEnterG}
          onMouseLeave={handleMouseLeaveG}
        />

        </div>
        <body  style={{ height:'100%',width:'100%', color: 'black'}}>

        <img style={{ width: '101%'}} src="./pictures/חתוך הכל ביחד בלי הכיתוב של המנגו.jpg" />
       
        <img style={{ width: '100%', marginTop:'-37vh'}} src="./pictures/gif.gif" />
        </body>
        </body>)}
