import React from 'react';
import './TaskCard.scss';
import Icon from './../common/Icon';
const TaskCard = ({
	taskItem,
	onEditIconClick,
	onDeleteIconClick,
	isEditing,
	changeHandler,
	onEditSubmit,
	style,
}) => {
	return (
		<div className='task-card' style={{ ...style }}>
			{isEditing ? (
				<div className='edit__task'>
					<input onChange={changeHandler} defaultValue={taskItem} />
					<Icon
						type='Done'
						onClick={onEditSubmit}
						tooltip={'Save Changes'}
					/>
				</div>
			) : (
				<span className='task__item'>{taskItem}</span>
			)}
			<Icon
				type={isEditing ? 'Close' : 'Edit'}
				className={'edit__icon'}
				onClick={onEditIconClick}
				tooltip={'Edit Task'}
			/>
			<Icon
				type='Delete'
				className={'delete__icon'}
				onClick={onDeleteIconClick}
				tooltip={'Delete Task'}
			/>
		</div>
	);
};

export default TaskCard;
