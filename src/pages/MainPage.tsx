import React, {useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {getAllNews} from "../redux/newsListSlice";
import CardItem from "../components/CardItem";
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import {Divider, Typography} from "@mui/material";
import styles from './MainPage.module.scss'


const MainPage = () => {
    const dispatch = useAppDispatch();
    const allNews = useAppSelector(state => state.newsList.news);
    const [filter, setFilter] = useState<string>('')
    useEffect(() => {
        dispatch(getAllNews())
    }, [dispatch])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }
    const filteredNews = useMemo(() => {
        if (filter) {
            return allNews.filter(item => {
                const matchValue = filter.toLowerCase()
                const {title, summary} = item
                if (title.toLowerCase().includes(matchValue)) return true
                return summary.toLowerCase().substring(0,200).includes(matchValue);
            })
        }
        return allNews
    }, [filter, allNews])

    return (
        <>
            <Typography gutterBottom fontWeight="bold" variant="h5" mt={2} component="div">
                Filter by keywords
            </Typography>
            <Box sx={{marginBottom: 3, height:1}}>
                <TextField
                    className={styles.tf}
                    size="small"
                    variant="outlined"
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment  className={styles.sv} position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Typography gutterBottom variant="h5" fontWeight="bold" component="div">
                Results: {filteredNews.length}
            </Typography>
            <Divider variant="fullWidth" className={styles.hr}/>
            <div className={styles.block}>
                {
                    filteredNews.length > 0 ? filteredNews.map((item, key) => <CardItem key={key}
                                                                                        featured={item.featured}
                                                                                        id={item.id}
                                                                                        imageUrl={item.imageUrl}
                                                                                        title={item.title}
                                                                                        newsSite={item.newsSite}
                                                                                        publishedAt={item.publishedAt}
                                                                                        summary={item.summary}
                                                                                        updatedAt={item.updatedAt}
                                                                                        url={item.url}
                                                                                        filter={filter}
                        />) :
                        <Typography gutterBottom variant="h5" component="div">
                            Data do not found :(
                        </Typography>
                }
            </div>
        </>
    );
};

export default MainPage;
