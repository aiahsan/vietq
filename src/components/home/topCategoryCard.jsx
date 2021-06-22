import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';



// const useStyles = makeStyles({
//     root: {
//         minWidth: 275,
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//     },
//     title: {
//         fontSize: 14,
//     },
//     pos: {
//         marginBottom: 12,
//     },
// });
export default function TopCategoryCard ({img,title,onClick}) {
    return <div className="m-2">
        <CardActionArea onClick={onClick}>
        <Card className="cstcardcate1" >
           
           <CardContent className="cstcardcatechild1">
               <img src={img} className="cstcardcate1-img" alt='img'/>
               <p className="margin-0 cstcardpara1">{title}</p>
           </CardContent>
       </Card>
        </CardActionArea>
      
    </div>


}