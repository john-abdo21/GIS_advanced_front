import React from 'react'
import { useSelector } from 'react-redux'
import './css.css'

const Error = () => {
    const errorMessage = useSelector(state => state.error, [])

    return (
        <div className="error_message">
          {errorMessage}
        </div>
    );
}

export default Error