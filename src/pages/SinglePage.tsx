import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getSingleNew} from "../redux/newsListSlice";
import {Box, Typography} from "@mui/material";
import styles from './SinglePage.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const SinglePage = () => {
    const {id}= useParams();
    const navigate= useNavigate()
    const dispatch = useAppDispatch();
    const singleNew = useAppSelector(state=> state.newsList.singleNew)
    const idI = Number(id);
    useEffect(()=>{
        dispatch(getSingleNew({idI}))
    },[dispatch])

    return (
        <>
            <Box
                component="img"
                className={styles.img}
                alt={singleNew.title}
                src={singleNew.imageUrl}
            />
            <div className={styles.block}>
                <Typography gutterBottom variant="h5" mb={5} fontWeight="bold" component="div">
                    {singleNew.title}
                </Typography>
                <Typography gutterBottom variant="subtitle1"  component="div">
                    {singleNew.summary}
                </Typography>
            </div>
            <Typography gutterBottom variant="h5" onClick={()=> navigate('/')}  component="div" fontWeight="bold" className={styles.goBack}>
                <ArrowBackIcon/>
                Back to homepage
            </Typography>
        </>
    );
};

export default SinglePage;
