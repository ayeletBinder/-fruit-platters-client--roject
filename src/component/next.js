

import { Alert } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Next() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div>
      <Alert severity="success">!!הינך מחובר למערכת</Alert>
    </div>
  );
}