import React from 'react';
import './AddTaskForm.scss';
const AddTaskForm = ({ onAddClick, onCancelClick }) => {
	return (
		<form className='add-task-form'>
			<textarea
				placeholder='Enter a task'
				style={{ maxWidth: '100%', minWidth: '100%' }}
			/>
			<button type='button'>Add</button>
			<button type='button' onClick={onCancelClick}>
				Cancel
			</button>
		</form>
	);
};

export default AddTaskForm;
