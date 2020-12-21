import {Grid,FormControlLabel,Box,Button,TextField,List,Avatar,ListItemText,ListItemAvatar,ListItem,CardContent,Typography,Divider} from "@material-ui/core";
import {Paper} from "@material-ui/core";
import useStyles from './style';

const Steps = () => {
  const classes = useStyles();
  return <>
          <div className="o-services-title"> What Happens Next</div>
          <div className="shadow">
          <Paper className={classes.Services}>
              <List>
                 {[{}, {}, {}].map((step, i) => {
                   return <>
                         <ListItem>
                         <ListItemAvatar>
                           <Avatar  style={{backgroundColor:"#000066"}}>
                             {i+1}
                           </Avatar>
                         </ListItemAvatar>
                         <ListItemText
                           primary=""
                           secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer" />
                         </ListItem>
                        </>
                  })}
              </List>
          </Paper>
        </div>
        </>
}

export default Steps;
