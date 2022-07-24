import React, { useState } from 'react';
import Icon from '../common/Icon';
import AddTaskForm from './AddTaskForm';
import './Boards.scss';
import TaskCard from './TaskCard';
import BoardData from './mock-data';

const Boards = () => {
	const [activeBoardIndexes, setActiveBoardIndexes] = useState(new Set([]));

	const onAddIconClick = (index) => {
		setActiveBoardIndexes((boardIndexes) => {
			const modifiedSet = new Set(boardIndexes);
			if (boardIndexes.has(index)) {
				modifiedSet.delete(index);
			} else modifiedSet.add(index);
			return modifiedSet;
		});
	};

	return (
		<div className='boards-wrapper'>
			{Object.entries(BoardData).map(([boardName, column], index) => {
				return (
					<div
						tabIndex={column._id}
						className='board'
						id={column._id}
						key={column._id}
					>
						<div className='board__header'>
							<div className='board__left'>
								<div className='board__items-length'>
									{column.tasks.length}
								</div>{' '}
								<span>{boardName}</span>
							</div>
							<div className='board__right'>
								<Icon
									onClick={() => onAddIconClick(index)}
									type={
										activeBoardIndexes.has(index)
											? 'remove'
											: 'add'
									}
									tooltip={'Add a new item to the board'}
								/>
								<Icon type='edit' tooltip={'Edit board name'} />
								<Icon type='delete' tooltip={'Delete board'} />
							</div>
						</div>
						<div className='board__tasks'>
							{activeBoardIndexes.has(index) ? (
								<AddTaskForm
									onCancelClick={() => onAddIconClick(index)}
								/>
							) : (
								''
							)}

							{column?.tasks?.map((task) => (
								<TaskCard
									key={task._id}
									taskItem={task.task_item}
								/>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Boards;
