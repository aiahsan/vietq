import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles({
    root: {
        maxWidth: 530,
        width: '100%',
    },
    media: {
        height: 262,
    },
});

export default function MediaCard(props) {
    const classes = useStyles();

    return (
        <Card className={[classes.root, "revcardd"]}>

            <CardActionArea >
                <CardMedia
                    className={classes.media}
                    image={props.img}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom className="revavatar">
                        <Avatar className="avt-cst-img">H</Avatar>
                    </Typography>
                    <div className="pd4p">
                        <Typography gutterBottom className="revdesig mtn-50 activty-lbl-cst-name">
                            {props.desig}
                        </Typography>
                        <Typography gutterBottom className="revsubdesig activty-lbl-cst-name-c1 color-prmry2">
                            {props.subdesig}
                        </Typography>
                        <Typography gutterBottom className="revtitle heading-child2-semibold">
                            {props.title}
                        </Typography>
                        <Typography variant="body2" component="p" className="revdesc activty-lbl-cst-name-c1 color-prmry2">
                            {props.detail}
                        </Typography>
                        <Typography variant="body2" component="p" className="revread activty-lbl-cst-name-c1 color-prmry3">
                            {props.read}
                        </Typography>
                        <Typography variant="body2" component="p" className="revdesc activty-lbl-cst-name-c2 color-prmry2 mt-1">
                            20 Comments
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
        </Card>
    );
}