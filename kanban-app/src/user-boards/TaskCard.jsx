import React from 'react';
import './TaskCard.scss';
const TaskCard = ({ taskItem, ...taskCardProps }) => {
	return (
		<div className='task-card' {...taskCardProps}>
			<span className='task__item'>{taskItem}</span>
		</div>
	);
};

export default TaskCard;
