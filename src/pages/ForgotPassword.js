import React from 'react'

const ForgotPassword = props => {
  return (
    <div className='forgotPwContainer'>
        <div className='forgotPwBody'>
            <span className='closeBtn' onClick={props.handleClose}>x</span>
            <form method='POST'>
                <input type='email' placeholder='Nhập email muốn đặt lại mật khẩu...' />
                <input type='submit' name='submit' value={'Đặt lại mật khẩu'} />
            </form>
        </div>
    </div>
  )
}

export default ForgotPassword
