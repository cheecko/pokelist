import { Portal, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const Toast = ({ message, type, hideDuration = 2000, handleAlertClose }) => {
  return (
    <Portal>
      <Snackbar open={!!message} autoHideDuration={hideDuration} onClose={handleAlertClose}>
        <Alert severity={type}>{message}</Alert>
      </Snackbar>
    </Portal>
  )
}

export default Toast
