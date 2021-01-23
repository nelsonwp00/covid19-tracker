import React from 'react';
import sad from '../../images/sad.png';

const ErrorPage = () => {
    return (
      <div className="text-center">
        <h3 className="mt-3"> Sorry, there is an API error.</h3>

        <img src={sad} alt='sad-icon'/>
      </div>
    )
}

export default ErrorPage;