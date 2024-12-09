import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField
} from '@mui/material';
import useAxios from '../services/useAxios';

function Books() {
  const { data, alert, loading, get, post, update, remove } = useAxios('http://localhost:3000');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
  }, [data]);
  // checks if books are fetched; if not - gets them form server

  async function getBooks() {
    try {
      await get('books');
      setBooks(data);
      setIsLoading(loading);
    } catch (error) {
      console.error(error);
    }
  }
  // fetches books

  const searchUpdate = (e) => {
    setSearch(e.target.value.toLowerCase());

  }

  // TODO: Implement search functionality
  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {!books && <CircularProgress />}
      {/* if hte books are loading show loadign*/}
      {books && (

        <div>
          <div className='search'>
            <TextField sx={{ mb: 4 }}
              name="search"
              id="outlined-basic"
              label="Search"
              variant="outlined"
              onChange={searchUpdate}
            />
          </div>
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {/* creates stacks of spaces for books*/}
            {books.map((book) => (
              (!search || book.name.toLowerCase().includes(search) || book.author.toLowerCase().includes(search)) && (
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '15%',
                    minWidth: 200,
                  }}
                  key={book.name}

                >
                  {/* creates book card*/}
                  <CardMedia
                    sx={{ height: 250 }}
                    image={book.img}
                    title={book.name}
                  />
                  <Box sx={{ pt: 2, pl: 2 }}>
                    {book.genres.map((genre, i) => (
                      <Chip
                        key={i}
                        label={genre}
                        variant="outlined"
                        size="small"
                      />

                    ))}
                    {/* creates pills for genres*/}
                    <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                      {book.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {book.author}
                    </Typography>
                  </Box>
                  {/* creates text with autoher and book name*/}
                  <CardActions
                    sx={{
                      justifyContent: 'space-between',
                      mt: 'auto',
                      pl: 2,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={+book.stars}
                      readOnly
                      size="small"
                    />
                    <Button size="small">Learn More</Button>
                  </CardActions>
                  {/* creates two active elements - rating and a button*/}
                </Card>
              )))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
