import React from 'react'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import { Fade, Paper } from '@mui/material'

export default function ModalComp({ isOpen, children, className, width = '90%', ...props }) {
  const open = Boolean(isOpen)

  return (
    <Modal
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      closeAfterTransition
      disableEnforceFocus
      open={open}
      {...props}
    >
      <Fade in={open}>
        <Paper
          style={{
            padding: '16px',
            width,
            maxWidth: '80%',
            maxHeight: '70%',
            minWidth: `max(${width}, 60%)`,
            overflowY: 'auto',
            boxSizing: 'content-box'
          }}
        >
          {children}
        </Paper>
      </Fade>
    </Modal>
  )
}

ModalComp.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
