// // ** React Imports

// // ** MUI Imports
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'

// import TextField from '@mui/material/TextField'

// import CardHeader from '@mui/material/CardHeader'

// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
// import CardActions from '@mui/material/CardActions'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'
// import Select from '@mui/material/Select'
// import MenuItem from '@mui/material/MenuItem'
// import { styled } from '@mui/material/styles'

// import { Task_Types } from '../../custom-types/enum'

// // ** Third Party Imports

// // ** Icon Imports

// // ** Types

// const Question = (props: { count: any }) => {
//   // ** States

//   return (
//     <Card sx={{ backgroundColor: '#fffafa' }}>
//       <CardHeader title={`Question ${props.count}`} />
//       <Divider sx={{ m: '0 !important' }} />
//       <form onSubmit={e => e.preventDefault()}>
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth variant='standard'>
//                 <InputLabel id='task-type-select-label'>Select task type</InputLabel>
//                 <Select
//                   labelId='task-type-select-label'
//                   id='task-type-select'
//                   label='Select task type'

//                   // onChange={e => setTaskType(e.target.value)}
//                 >
//                   <MenuItem value='design'>{Task_Types.COMMUNICATION}</MenuItem>
//                   <MenuItem value='development'>{Task_Types.LEADERSHIP}</MenuItem>
//                   <MenuItem value='testing'>{Task_Types.PROGRAMMING}</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField label='Description' fullWidth multiline rows={4} placeholder='Description here' />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label='Duration'
//                 type='number'
//                 placeholder='Time to complete (in seconds)'
//                 InputProps={{
//                   endAdornment: (
//                     <Typography variant='body2' sx={{ fontWeight: 600 }}>
//                       seconds
//                     </Typography>
//                   )
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </CardContent>
//       </form>
//     </Card>
//   )
// }

// export default Question

import React from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import TextField from '@mui/material/TextField'

import CardHeader from '@mui/material/CardHeader'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'

import { Task_Types } from '../../custom-types/enum'

// ** Types

const Question = (props: { count: any }) => {
  // ** States

  return (
    <Card sx={{ backgroundColor: '#f5f5f5', mb: 2, boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }}>
      <CardHeader title={`Question ${props.count}`} />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant='standard'>
                <InputLabel id='task-type-select-label'>Select task type</InputLabel>
                <Select
                  labelId='task-type-select-label'
                  id='task-type-select'
                  label='Select task type'

                  //                   // onChange={e => setTaskType(e.target.value)}
                >
                  <MenuItem value='design'>{Task_Types.COMMUNICATION}</MenuItem>
                  <MenuItem value='development'>{Task_Types.LEADERSHIP}</MenuItem>
                  <MenuItem value='testing'>{Task_Types.PROGRAMMING}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Description'
                fullWidth
                multiline
                rows={4}
                placeholder='Description here'
                sx={{ bgcolor: '#ffffff', mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Duration'
                type='number'
                placeholder='Time to complete (in seconds)'
                InputProps={{
                  endAdornment: (
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      seconds
                    </Typography>
                  )
                }}
                sx={{ bgcolor: '#ffffff', mt: 2 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

export default Question
