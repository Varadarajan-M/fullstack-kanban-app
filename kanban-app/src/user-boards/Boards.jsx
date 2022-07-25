import React, { useEffect, useState, Fragment } from 'react';
import Icon from '../common/Icon';
import AddTaskForm from './AddTaskForm';
import './Boards.scss';
import TaskCard from './TaskCard';
import { getBoardInfo, getUser, isResOk } from './../api/helper';
import { removeKey } from './helper';
import { useNavigate } from 'react-router-dom';

const Boards = () => {
	const [activeBoardIndexes, setActiveBoardIndexes] = useState(new Set([]));
	const [boardDataLoading, setBoardDataLoading] = useState(false);
	const [addBoardModalOpen, setAddBoardModalOpen] = useState(false);
	const [deletedStack, setDeletedStack] = useState({ boards: [], tasks: [] });
	const navigate = useNavigate();
	const [boardData, setBoardData] = useState({});

	useEffect(() => {
		async function getBoardInformation() {
			setBoardDataLoading(true);
			const res = await getBoardInfo(getUser());
			if (isResOk(res)) {
				setBoardData(res.payload);
				setBoardDataLoading(false);
			} else {
				navigate('/login', { replace: true });
			}
		}
		getBoardInformation();
	}, []);

	const onAddIconClick = (index) => {
		setActiveBoardIndexes((boardIndexes) => {
			const modifiedSet = new Set(boardIndexes);
			boardIndexes.has(index)
				? modifiedSet.delete(index)
				: modifiedSet.add(index);
			return modifiedSet;
		});
	};

	const onBoardDelete = (boardId, boardPosition) => {
		setDeletedStack((stack) => ({
			...stack,
			boards: [...stack.boards, { _id: boardId }],
		}));
		setBoardData((b) => removeKey(b, boardPosition));
	};

	useEffect(() => console.log(deletedStack), [deletedStack]);
	return (
		<div className='boards-wrapper'>
			{!boardDataLoading ? (
				<Fragment>
					{Object.entries(boardData).map(
						([boardPos, column], index) => {
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
											<span>{column.board_name}</span>
										</div>
										<div className='board__right'>
											<Icon
												onClick={() =>
													onAddIconClick(index)
												}
												type={
													activeBoardIndexes.has(
														index,
													)
														? 'remove'
														: 'add'
												}
												tooltip={
													'Add a new item to the board'
												}
											/>
											<Icon
												type='edit'
												tooltip={'Edit board name'}
											/>
											<Icon
												onClick={() =>
													onBoardDelete(
														column._id,
														boardPos,
													)
												}
												type='delete'
												tooltip={'Delete board'}
											/>
										</div>
									</div>
									<div className='board__tasks'>
										{activeBoardIndexes.has(index) ? (
											<AddTaskForm
												onCancelClick={() =>
													onAddIconClick(index)
												}
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
						},
					)}

					<div className='board add__new'>
						<span role='button'>Add New Board</span>
					</div>
				</Fragment>
			) : (
				<p style={{ marginTop: '200px' }}>Loading...</p>
			)}
		</div>
	);
};

export default Boards;
