import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const backgroundColors = ['#93A7FF', '#A9E775', '#FF7A9A', '#B379F7','#FF6674','#D3EBED', '#FFFFFF'];


export default function WuphfLog({waver, timestamp, message}) {

    var backgroundColor = backgroundColors[timestamp % backgroundColors.length];
    const avatar = `https://avatars.dicebear.com/api/personas/${timestamp}.svg?backgroundColor=${encodeURIComponent(backgroundColor)}`;
    console.log(avatar);

  return (
    <Card sx={{ display: 'flex', m: 3 }}>
    <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={avatar}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {waver.substring(0,15)}....
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {message}
          </Typography>
            <Typography sx={{ alignSelf: 'self-end' }} variant="subtitle1" color="text.secondary" component="div">
                {timestamp.toLocaleString()}
            </Typography>
        </CardContent>
        </Box>
        
    </Card>
  );
}

