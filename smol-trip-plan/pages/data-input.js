// pages/data-input.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function DataInput() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [list, setList] = useState(['']);
  const router = useRouter();

  useEffect(() => {
    // Fetch existing data
    fetch('/api/get-data')
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setTitle(data.title);
          setLocation(data.location);
          setDate(formatDateForPicker(data.date));
          setList(data.list);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddPoint = () => {
    setList([...list, '']);
  };

  const handleListChange = (index, value) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };

  const formatDateForPicker = (dateString) => {
    const [day, month, year] = dateString.split(' ');
    const monthIndex = new Date(`${month} 1, 2020`).getMonth() + 1;
    const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
    const formattedDay = parseInt(day, 10) < 10 ? `0${parseInt(day, 10)}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const formatDateForSaving = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Determine the suffix for the day
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }

    return `${day}${suffix} ${month} ${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = formatDateForSaving(date);
    const data = { title, location, date: formattedDate, list };

    const response = await fetch('/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push('/');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {title ? 'Edit Data' : 'Input Data'}
        </Typography>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Location"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <Typography variant="h6" gutterBottom>
          List
        </Typography>
        <List>
          {list.map((point, index) => (
            <ListItem key={index}>
              <TextField
                fullWidth
                value={point}
                onChange={(e) => handleListChange(index, e.target.value)}
                margin="normal"
              />
            </ListItem>
          ))}
        </List>
        <IconButton onClick={handleAddPoint}>
          <AddIcon />
        </IconButton>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            {title ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
