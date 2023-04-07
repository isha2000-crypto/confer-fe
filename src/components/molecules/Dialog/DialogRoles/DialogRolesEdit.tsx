import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  FormControl,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  FormControlLabel,
  Checkbox,
  TableBody,
  DialogActions,
  Button
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { ACTIONS } from '@custom-types/enum'
import { getSubjectTitles } from 'src/utils/functions'

interface Props {
  handleClose: any
  open: boolean
  dialogTitle: string
  role: any
}

const rolesArr = getSubjectTitles()

function DialogRolesEdit({ role, handleClose, open, dialogTitle }: Props) {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [title, setTitle] = useState(role?.title)

  const handleTitleChange = (e: any) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  const closeDialog = () => {
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
    handleClose()
  }

  const togglePermission = (id: string) => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      rolesArr.forEach((row: any) => {
        const id = row.value
        togglePermission(`${id}-${ACTIONS.READ}`)
        togglePermission(`${id}-${ACTIONS.CREATE}`)
        togglePermission(`${id}-${ACTIONS.UPDATE}`)
        togglePermission(`${id}-${ACTIONS.DELETE}`)
      })
    }
  }

  useEffect(() => {
    if (role) {
      const { permissions } = role
      const eachPermission = Object.keys(permissions)
      const typeNameIndex = eachPermission.findIndex(arg => arg === '__typename')
      if (typeNameIndex > -1) eachPermission.splice(typeNameIndex, 1)
      eachPermission.forEach(permVal => {
        permissions[permVal].forEach((action: any) => {
          togglePermission(`${permVal}-${action}`)
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role])

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 4) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  return (
    <Dialog fullWidth maxWidth='md' scroll='body' onClose={closeDialog} open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography variant='h5' component='span'>
          {`${dialogTitle} Role`}
        </Typography>
        <Typography variant='body2'>Set Role Permissions</Typography>
      </DialogTitle>
      <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
        <Box sx={{ my: 4 }}>
          <FormControl fullWidth>
            <TextField label='Role Name' placeholder='Enter Role Name' value={title} onChange={handleTitleChange} />
          </FormControl>
        </Box>
        <Typography variant='h6'>Role Permissions</Typography>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: '0 !important' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      fontSize: '0.875rem',
                      whiteSpace: 'nowrap',
                      alignItems: 'center',
                      textTransform: 'capitalize',
                      '& svg': { ml: 1, cursor: 'pointer' }
                    }}
                  >
                    Administrator Access
                    <Tooltip placement='top' title='Allows a full access to the system'>
                      <Box sx={{ display: 'flex' }}>
                        <Icon icon='mdi:information-outline' fontSize='1rem' />
                      </Box>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell colSpan={3}>
                  <FormControlLabel
                    label='Select All'
                    sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                    control={
                      <Checkbox
                        size='small'
                        onChange={handleSelectAllCheckbox}
                        indeterminate={isIndeterminateCheckbox}
                        checked={selectedCheckbox.length === rolesArr.length * 4}
                      />
                    }
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rolesArr.map((i: any, index: number) => {
                const id = i.value

                return (
                  <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        color: theme => `${theme.palette.text.primary} !important`
                      }}
                    >
                      {i.label}
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        label={ACTIONS.CREATE}
                        control={
                          <Checkbox
                            size='small'
                            id={`${id}-${ACTIONS.CREATE}`}
                            onChange={() => togglePermission(`${id}-${ACTIONS.CREATE}`)}
                            checked={selectedCheckbox.includes(`${id}-${ACTIONS.CREATE}`)}
                          />
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        label={ACTIONS.READ}
                        control={
                          <Checkbox
                            size='small'
                            id={`${id}-${ACTIONS.READ}`}
                            onChange={() => togglePermission(`${id}-${ACTIONS.READ}`)}
                            checked={selectedCheckbox.includes(`${id}-${ACTIONS.READ}`)}
                          />
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        label={ACTIONS.UPDATE}
                        control={
                          <Checkbox
                            size='small'
                            id={`${id}-${ACTIONS.UPDATE}`}
                            onChange={() => togglePermission(`${id}-${ACTIONS.UPDATE}`)}
                            checked={selectedCheckbox.includes(`${id}-${ACTIONS.UPDATE}`)}
                          />
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        label={ACTIONS.DELETE}
                        control={
                          <Checkbox
                            size='small'
                            id={`${id}-${ACTIONS.DELETE}`}
                            onChange={() => togglePermission(`${id}-${ACTIONS.DELETE}`)}
                            checked={selectedCheckbox.includes(`${id}-${ACTIONS.DELETE}`)}
                          />
                        }
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
        <Box className='demo-space-x'>
          <Button size='large' type='submit' variant='contained' onClick={closeDialog}>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={closeDialog}>
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default DialogRolesEdit
