import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { StyledButton } from './styles/Button.styled'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <StyledButton onClick={toggleVisibility} bghover='#5a5a5a'>
          {props.buttonLabel}
        </StyledButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <StyledButton
          onClick={toggleVisibility}
          bg='#bc4749'
          textColor='white'
          bghover='#780000'
        >
          cancel
        </StyledButton>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
