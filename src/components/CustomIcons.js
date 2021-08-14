import { Icon } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  ImageIcon: {
    display: 'flex',
    height: 'inherit',
    width: 'inherit'
  }
});

const CustomIcons = ({ name, width, height, className }) => {
  const classes = useStyles();

  return (
    <Icon style={{ width: width, height: height}}>
      <img alt='CustomIcon' className={`${className} ${classes.ImageIcon}`} src={`/${name}.svg`} />
    </Icon>
  )
}

export default CustomIcons