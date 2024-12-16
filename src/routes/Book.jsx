import { useNavigate, useParams } from "react-router-dom";
import useAxios from '../services/useAxios';
import { useState, useEffect } from "react";
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


function Book() {
    const { data, alert, loading, get, post, update, remove } = useAxios('http://localhost:3000');
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (book.length === 0) {
            getBook();
        }
    }, [data]);

    const getBook = async () => {
        try {
            await get(`books/${id}`);
            setBook(data);
            setIsLoading(loading);
        } catch (error) {
            console.error(error);
        }
    }

    return (

        <Box sx={{ mx: 'auto', p: 2 }}>
            {book.name === undefined && <CircularProgress />}
            {/* if hte books are loading show loadign*/}
            {book.name !== undefined && (
                < div >


                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            maxWidth: 600,
                            mx: "auto"
                        }}
                        key={book.name}

                    >
                        {/* creates book card*/}
                        <CardMedia
                            sx={{ height: 300, width: 200 }}
                            image={book.img}
                            title={book.name}
                        />
                        <Box sx={{
                            pt: 2, pl: 2, display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Box sx={{ pt: 2, pl: 2, alignSelf: "center" }}>
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
                                <Button size="small" onClick={() => navigate(-1)}>Go Back </Button>
                            </CardActions>
                            {/* creates two active elements - rating and a button*/}
                        </Box>
                    </Card>

                </div>
            )
            }
        </Box >
    )

}

export default Book;