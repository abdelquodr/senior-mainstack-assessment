import { useState, useEffect } from 'react'
import { DtPicker }  from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/style.css'

// DatePicker wrapper that accepts optional `value` and `onChange` props.
// If `value`/`onChange` are not provided the component manages its own state.
export default function DatePicker ({ value, onChange, inputClass, ...rest } = {}) {
	const dateObj = {
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
		day: new Date().getDate(),
	}

	const [internalDate, setInternalDate] = useState(value ?? dateObj)

	// keep internal state in sync when value prop changes
	useEffect(() => {
		if (!value) return
		try {
			const a = JSON.stringify(value)
			const b = JSON.stringify(internalDate)
			if (a !== b) setInternalDate(value)
		} catch (e) {
			setInternalDate(value)
		}
	}, [value, internalDate])

	const handleChange = (d) => {
		if (typeof onChange === 'function') return onChange(d)
		setInternalDate(d)
	}

	return (
		<DtPicker
			initValue={value ?? internalDate}
			onChange={handleChange}
			inputClass={inputClass ?? 'px-2 text-left border-none appearance-none bg-grey-light outline-none rounde-md w-full font-semibold text-grey-solid text-xs px-[20px]'}
			clearBtnClass='bg-grey-solid text-white'
			calenderModalClass='bg-transparent'
			headerClass='bg-white'
			{...rest}
		/>
	)
}
