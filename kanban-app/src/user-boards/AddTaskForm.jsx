import React from 'react';
import './AddTaskForm.scss';
const BasicAddForm = ({
	onAddClick,
	onCancelClick,
	placeholder,
	changeHandler,
	value,
}) => {
	return (
		<form className='add-task-form'>
			<textarea
				value={value}
				placeholder={placeholder}
				onChange={changeHandler}
				style={{ maxWidth: '100%', minWidth: '100%' }}
			/>
			<button type='button' onClick={onAddClick}>
				Add
			</button>
			<button type='button' onClick={onCancelClick}>
				Cancel
			</button>
		</form>
	);
};

export default BasicAddForm;
