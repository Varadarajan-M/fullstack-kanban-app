import React from 'react';
import './TaskCard.scss';
import Icon from './../common/Icon';
const TaskCard = ({ taskItem, onEdit, onDelete, ...taskCardProps }) => {
	return (
		<div className='task-card' {...taskCardProps}>
			<span className='task__item'>{taskItem}</span>
			<Icon type='Edit' onClick={onEdit} tooltip={'Edit Task'} />
			<Icon type='Delete' onClick={onDelete} tooltip={'Delete Task'} />
		</div>
	);
};

export default TaskCard;
