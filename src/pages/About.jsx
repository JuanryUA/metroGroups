import Header from "../components/Header";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Card, CardActions, CardContent, CardMedia } from "@mui/material";


import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Avatar from '@mui/material/Avatar';

const StyledListItem = styled(ListItemText)`
text-align : center`


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function About() {
  return (
    <Box sx={{ flexGrow: 1 , mt : 2}}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Item>
            <Card>
                <CardMedia>
                    MISION
                </CardMedia>
                <CardContent>
                    DESCRIPCION
                </CardContent>
            </Card>
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            <Card>
                <CardMedia>
                    VISION
                </CardMedia>
                <CardContent>
                    DESCRIPCION
                </CardContent>
            </Card>
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            <Card>
                <CardMedia>
                    OBJETIVOS
                </CardMedia>
                <CardContent>
                    DESCRIPCION
                </CardContent>
            </Card>
          </Item>
        </Grid>
        <Grid xs={12}>
          <Item>
            <Card>
                <CardMedia>
                    TODAS LA AGRUPACIONES
                </CardMedia>
                <CardContent>
                    <List
                        sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar>A</Avatar>
                                </ListItemIcon>
                                    <StyledListItem primary="ARCA" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar>P</Avatar>
                                </ListItemIcon>
                                    <StyledListItem primary="PADEL" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar>F1</Avatar>
                                </ListItemIcon>
                                    <StyledListItem primary="FORMULA" />
                            </ListItemButton>
                    </List>
                </CardContent>
                <CardActions>
                    <Button size="big" sx={{width: '100%'}}>CREAR AGRUGPACION</Button>
                </CardActions>
            </Card>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

