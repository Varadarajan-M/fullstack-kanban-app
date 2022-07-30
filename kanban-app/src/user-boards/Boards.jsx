import React, { useEffect, useState, Fragment } from 'react';
import Icon from '../common/Icon';
import BasicAddForm from './AddTaskForm';
import './Boards.scss';
import TaskCard from './TaskCard';
import { useBoardData } from '../context/BoardDataContext';
import { removeAndAddToList, reorderList, toggleElementFromSet } from './helper';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import Loader from '../common/Loader';

const Boards = () => {
	const [activeBoardIndexes, setActiveBoardIndexes] = useState(new Set([]));
	const [editingBoardIndexes, setEditingBoardIndexes] = useState(new Set([]));
	const [editingTaskIndexes, setEditingTaskIndexes] = useState(new Set([]));
	const [isAddingBoard, setIsAddingBoard] = useState(false);
	const [boardNamesEditTracker, setBoardNamesEditTracker] = useState({});
	const [taskEditTracker, setTaskEditTracker] = useState({});
	const [inputs, setInputs] = useState({});

	const {
		boardDataLoading,
		boardData,
		getBoardInformation,
		deleteBoardInfo,
		editBoardName,
		addNewBoard,
		setDeletedStack,
		addNewTask,
		deleteTask: deleteTaskContext,
		editTask,
		updateListOrder,
	} = useBoardData();

	const onAddIconClick = (index) => toggleElementFromSet(activeBoardIndexes, index, setActiveBoardIndexes);

	const onEditIconClick = (index, boardPos) => {
		toggleElementFromSet(editingBoardIndexes, index, setEditingBoardIndexes);
		setBoardNamesEditTracker((tracker) => ({
			...tracker,
			[boardPos]: '',
		}));
	};
	const onBoardDelete = (boardId, boardPosition) => {
		setDeletedStack((stack) => ({
			...stack,
			boards: [...stack.boards, { _id: boardId }],
			tasks: [
				...stack.tasks,
				...boardData[boardPosition]?.tasks?.map((t) => ({
					_id: t._id,
				})),
			],
		}));
		deleteBoardInfo(boardPosition);
	};

	const boardNamesChangeHandler = (e, boardPosition) => {
		setBoardNamesEditTracker((tracker) => ({
			...tracker,
			[boardPosition]: e.target.value,
		}));
	};

	const boardNamesEditHandler = (boardPosition, index) => {
		onEditIconClick(index, boardPosition);
		editBoardName(boardPosition, boardNamesEditTracker[[boardPosition]]);
	};

	const toggleBoardAdd = () => setIsAddingBoard(!isAddingBoard);

	const addBoardChangeHandler = (e) => {
		setInputs((ip) => ({
			...ip,
			newBoard: e.target.value,
		}));
	};

	const addBoardSubmitHandler = () => {
		addNewBoard(inputs.newBoard);
		addBoardChangeHandler({ target: { value: '' } });
	};

	const addNewTaskChangeHandler = (e, boardPosition) => {
		setInputs((ip) => ({ ...ip, [boardPosition]: e.target.value }));
	};

	const addNewTaskSubmitHandler = (boardPosition, boardIndex) => {
		addNewTask(inputs[boardPosition] ?? '', boardPosition);
		addNewTaskChangeHandler({ target: { value: '' } }, boardPosition);
		onAddIconClick(boardIndex);
	};

	const deleteTask = (task, boardPosition) => {
		setDeletedStack((stack) => ({
			...stack,
			tasks: [...stack.tasks, { _id: task._id }],
		}));
		deleteTaskContext(task, boardPosition);
	};

	const onTaskEditIconClick = (taskId) => toggleElementFromSet(editingTaskIndexes, taskId, setEditingTaskIndexes);

	const taskEditChangeHandler = (e, task_id) => {
		setTaskEditTracker((tracker) => ({
			...tracker,
			[task_id]: e.target.value,
		}));
	};

	const taskEditSubmitHandler = (boardPos, task_id) => {
		editTask(boardPos, task_id, taskEditTracker[task_id]);
		onTaskEditIconClick(task_id);
		taskEditChangeHandler({ target: { value: '' } }, task_id);
	};

	const onDragEnd = (e) => {
		const source = e.source;
		const destination = e.destination;
		if (!destination) return;

		if (source.droppableId === destination.droppableId && source.index !== destination.index) {
			const destId = destination.droppableId;
			const list = [...boardData[destId]?.tasks];

			updateListOrder(destId, reorderList(list, destination.index, list[source.index]));
		} else if (source.droppableId !== destination.droppableId) {
			const sourceIndex = source.index;
			const destinationIndex = destination.index;
			const sourceId = source.droppableId;
			const destId = destination.droppableId;
			const sourceList = [...boardData[sourceId].tasks];
			const destList = [...boardData[destId].tasks];

			sourceList[sourceIndex].board_id = boardData[destId]._id;

			const modifiedList = removeAndAddToList(sourceList, destList, destinationIndex, sourceList[sourceIndex]);
			updateListOrder(sourceId, modifiedList.sourceList);
			updateListOrder(destId, modifiedList.destList);
		} else {
			return;
		}
	};

	useEffect(() => {
		getBoardInformation();
	}, []);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='boards-wrapper'>
				{!boardDataLoading ? (
					<Fragment>
						{Object.entries(boardData).map(([boardPos, column], index) => {
							return (
								<Droppable key={column._id} droppableId={boardPos}>
									{(provided, snapshot) => (
										<div
											tabIndex={column._id}
											className='board'
											{...provided.droppableProps}
											ref={provided.innerRef}
											style={{
												border: snapshot.isDraggingOver ? '2px solid cyan' : '',
											}}
										>
											<div className='board__header'>
												<div className='board__left'>
													<div className='board__items-length'>{column?.tasks?.length}</div>{' '}
													{editingBoardIndexes.has(index) ? (
														<div className='board__edit'>
															<input
																onChange={(e) => boardNamesChangeHandler(e, boardPos)}
																defaultValue={column?.board_name}
															/>
															<Icon
																type={'Done'}
																onClick={() => boardNamesEditHandler(boardPos, index)}
															/>
														</div>
													) : (
														<span>{column.board_name}</span>
													)}
												</div>
												<div className='board__right'>
													<Icon
														onClick={() => onAddIconClick(index)}
														type={activeBoardIndexes.has(index) ? 'remove' : 'add'}
														tooltip={'Add a new item to the board'}
													/>
													<Icon
														onClick={() => onEditIconClick(index, boardPos)}
														type={editingBoardIndexes.has(index) ? 'close' : 'edit'}
														tooltip={'Edit board name'}
													/>
													<Icon
														onClick={() => onBoardDelete(column._id, boardPos)}
														type='delete'
														tooltip={'Delete board'}
													/>
												</div>
											</div>

											<div className='board__tasks'>
												{activeBoardIndexes.has(index) ? (
													<BasicAddForm
														value={inputs[boardPos] ?? ''}
														changeHandler={(e) => addNewTaskChangeHandler(e, boardPos)}
														placeholder={'Enter task item'}
														onAddClick={() => addNewTaskSubmitHandler(boardPos, index)}
														onCancelClick={() => onAddIconClick(index)}
													/>
												) : (
													''
												)}

												{column?.tasks?.map((task, idx) => (
													<Draggable key={task._id} draggableId={task._id} index={idx}>
														{(provided, snapshot) => (
															<div
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																ref={provided.innerRef}
																style={{
																	...provided.draggableProps.style,
																}}
															>
																<TaskCard
																	style={{
																		border: snapshot.isDragging ? '2px solid orangered' : '',
																	}}
																	taskItem={task.task_item}
																	isEditing={editingTaskIndexes.has(task._id)}
																	onEditIconClick={() => onTaskEditIconClick(task._id)}
																	onEditSubmit={() => taskEditSubmitHandler(boardPos, task._id)}
																	onDeleteIconClick={() => deleteTask(task, boardPos)}
																	changeHandler={(e) => taskEditChangeHandler(e, task._id)}
																/>
															</div>
														)}
													</Draggable>
												))}
											</div>
											<div>{provided.placeholder}</div>
										</div>
									)}
								</Droppable>
							);
						})}

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
					<Loader />
				)}
			</div>
		</DragDropContext>
	);
};

export default Boards;
