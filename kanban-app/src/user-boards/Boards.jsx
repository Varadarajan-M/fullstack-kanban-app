import React, { useEffect, useState, Fragment } from 'react';
import Icon from '../common/Icon';
import BasicAddForm from './AddTaskForm';
import './Boards.scss';
import TaskCard from './TaskCard';
import { useBoardData } from '../context/BoardDataContext';
import { toggleElementFromSet } from './helper';

const Boards = () => {
	const [activeBoardIndexes, setActiveBoardIndexes] = useState(new Set([]));
	const [editingBoardIndexes, setEditingBoardIndexes] = useState(new Set([]));
	const [deletedStack, setDeletedStack] = useState({ boards: [], tasks: [] });
	const [isAddingBoard, setIsAddingBoard] = useState(false);
	const [boardNamesEditTracker, setBoardNamesEditTracker] = useState({});
	const [inputs, setInputs] = useState({});

	const {
		boardDataLoading,
		boardData,
		getBoardInformation,
		deleteBoardInfo,
		editBoardName,
		addNewBoard,
	} = useBoardData();

	const onAddIconClick = (index) =>
		toggleElementFromSet(activeBoardIndexes, index, setActiveBoardIndexes);

	const onEditIconClick = (index) => {
		toggleElementFromSet(
			editingBoardIndexes,
			index,
			setEditingBoardIndexes,
		);
		setBoardNamesEditTracker((tracker) => ({
			...tracker,
			[index + 1]: '',
		}));
	};
	const onBoardDelete = (boardId, boardPosition) => {
		setDeletedStack((stack) => ({
			...stack,
			boards: [...stack.boards, { _id: boardId }],
		}));
		deleteBoardInfo(boardPosition);
	};

	const boardNamesChangeHandler = (e, boardPosition) => {
		setBoardNamesEditTracker((tracker) => ({
			...tracker,
			[boardPosition]: e.target.value,
		}));
	};

	const boardNamesEditHandler = (boardPosition) => {
		onEditIconClick(+boardPosition - 1);
		editBoardName(boardPosition, boardNamesEditTracker[[boardPosition]]);
	};

	const toggleBoardAdd = () => setIsAddingBoard(!isAddingBoard);

	useEffect(() => {
		getBoardInformation();
	}, []);

	const addBoardChangeHandler = (e) => {
		setInputs((ip) => ({
			...ip,
			newBoard: e.target.value,
		}));
	};

	const addBoardSubmitHandler = () => {
		if (deletedStack?.boards?.length > 0) {
			alert('Please save changes before adding new board');
			return;
		}
		addNewBoard(inputs.newBoard);
		addBoardChangeHandler({ target: { value: '' } });
	};

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
												{column?.tasks?.length}
											</div>{' '}
											{editingBoardIndexes.has(index) ? (
												<div className='board__edit'>
													<input
														onChange={(e) =>
															boardNamesChangeHandler(
																e,
																boardPos,
															)
														}
														defaultValue={
															column?.board_name
														}
													/>
													<Icon
														type={'Done'}
														onClick={() =>
															boardNamesEditHandler(
																boardPos,
															)
														}
													/>
												</div>
											) : (
												<span>{column.board_name}</span>
											)}
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
												onClick={() =>
													onEditIconClick(index)
												}
												type={
													editingBoardIndexes.has(
														index,
													)
														? 'close'
														: 'edit'
												}
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
											<BasicAddForm
												placeholder={'Enter task item'}
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
						<div className='title' onClick={toggleBoardAdd}>
							{' '}
							<Icon type={isAddingBoard ? 'Remove' : 'Add'} />
							<span role='button'> Add New Board</span>{' '}
						</div>
						{isAddingBoard ? (
							<BasicAddForm
								value={inputs?.newBoard ?? ''}
								changeHandler={addBoardChangeHandler}
								onAddClick={addBoardSubmitHandler}
								placeholder={'Enter new board name'}
								onCancelClick={toggleBoardAdd}
							/>
						) : (
							''
						)}
					</div>
				</Fragment>
			) : (
				<p style={{ marginTop: '200px' }}>Loading...</p>
			)}
		</div>
	);
};

export default Boards;
