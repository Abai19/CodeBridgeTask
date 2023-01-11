import React, {useCallback} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {ISingleNew} from "../redux/newsListSlice";
import styles from './CardItem.module.scss'
import {Link} from "react-router-dom";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {LightText} from "./LightText";
const CardItem = ( info: ISingleNew) => {
    const light = useCallback((str:string) => {
        return <LightText filter={info.filter!!} str={str} />
    }, [info.filter])
    const fixData = (date:string)=> date.replace("T", " ").slice(0,-5)
    return (
        <Card className={styles.card}>
            <Link to={`/${info.id}`}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="150"
                    image={info.imageUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="subtitle1" className={styles.date} component="div" >
                        <CalendarTodayIcon/>
                        {fixData(info.publishedAt)}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                        {light(info.title)}
                    </Typography>
                    <Typography variant="body2" >
                        {light(info.summary.substring(0,200))} ...
                    </Typography>
                    <Typography variant="h6" component="div" fontWeight="bold" mt={3} className={styles.rm}>
                        Read more
                        <ArrowForwardIcon/>
                    </Typography>
                </CardContent>

            </CardActionArea>
            </Link>
        </Card>

    );
};

export default CardItem;
