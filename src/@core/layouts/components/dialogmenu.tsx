import React, { useState } from 'react'
import MenuItem from '../components/shared-components/UserDropdown'
import DialogInvite from '../../../components/molecules/Dialog/DialogInvite'

function Menu() {
  const [showDialog, setShowDialog] = useState(false)

  const handleShowDialog = () => {
    setShowDialog(true)
  }

  const handleHideDialog = () => {
    setShowDialog(false)
  }

  return (
    <div>
      <MenuItem onClick={handleShowDialog} />
      {showDialog && <DialogInvite onClose={handleHideDialog} />}
    </div>
  )
}

export default Menu
