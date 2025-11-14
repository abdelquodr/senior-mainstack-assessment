import React, { useState, useEffect } from 'react';

export default function Checkbox({textLabel, getValue}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getValue(isChecked, textLabel);
  }, [isChecked]);


  const handleCheckboxChange = () => {
    setIsChecked(isChecked => !isChecked);
  }

  return (
    <div className='flex py-2 space-x-3 w-full items-center'>
      <label className='checkbox-label' htmlFor={`checkbox-input-${textLabel}`}>
        <input id={`checkbox-input-${textLabel}`} onChange={ handleCheckboxChange } type='checkbox' className='accent-black focus:accent-black' checked={isChecked}  /> 
      </label>
      <span className='text-grey-solid mx-2 leading-6 font-semibold text-xs'>{textLabel}</span>
    </div>
  )
}
