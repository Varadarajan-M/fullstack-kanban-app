import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoardInfo, isResOk, updateBoard, getUser, addBoard, saveAllChanges, addTask } from '../api/helper';

import { isStrFalsy } from '../util';
import { removeKey, setValue, useInstantUpdate } from './../user-boards/helper';
import { useAuth } from './AuthContext';

const BoardDataContext = createContext({});

export const BoardDataContextProvider = ({ children }) => {
	const [boardData, setBoardData] = useState({});
	const [boardDataLoading, setBoardDataLoading] = useState(false);
	const [saveState, setSaveState] = useState('disabled');
	const [deletedStack, setDeletedStack] = useState({ boards: [], tasks: [] });
	const navigate = useNavigate();
	const { performInstantUpdate } = useInstantUpdate(setBoardData);

	const { clearAuthState } = useAuth();

	// Board Methods
	const getBoardInformation = useCallback(async () => {
		setBoardDataLoading(true);
		const res = await getBoardInfo(getUser());
		if (isResOk(res)) {
			setBoardData(res.payload);
			setBoardDataLoading(false);
		} else {
			clearAuthState();
			navigate('/login', { replace: true });
		}
	}, []);

	const deleteBoardInfo = useCallback((boardPosition) => {
		setBoardData((b) => removeKey(b, boardPosition));
		setSaveState('enabled');
	}, []);

	const editBoardName = async (key, value) => {
		if (isStrFalsy(value)) return;
		const res = await updateBoard(boardData[[key]]._id, value, getUser());
		if (!res?.ok) {
			alert(res?.error?.message);
			return;
		}
		performInstantUpdate(setValue(boardData, `${key}.board_name`, value));
	};

	const addNewBoard = async (value) => {
		if (isStrFalsy(value)) return;
		const board = {
			board_name: value,
		};
		const res = await addBoard(board, getUser());
		if (isResOk(res)) {
			setBoardData((boards) => ({
				...boards,
				[res?.payload?.board_position]: {
					...res?.payload,
					tasks: [],
				},
			}));
		} else {
			alert(res?.error?.message);
		}
	};

	const saveChanges = async () => {
		const payload = { tasks: [], deletedStack };
		setSaveState('saving');
		Object.entries(boardData).forEach(([key, board]) => {
			const tasks = board.tasks.reduce((ac, task, index) => [...ac, { ...task, task_position: index }], []);
			payload.tasks.push(tasks);
		});
		payload.tasks = payload.tasks.flat();

		const res = await saveAllChanges(payload, getUser());
		if (isResOk(res)) setSaveState('disabled');
	};

	// task methods

	const addNewTask = async (task, boardPosition) => {
		const newTask = {
			task_item: task,
			board_id: boardData[boardPosition]._id,
		};
		const res = await addTask(newTask, getUser());
		if (isResOk(res)) {
			setBoardData((boards) => ({
				...boards,
				[boardPosition]: {
					...boards[boardPosition],
					tasks: [...boards[boardPosition]?.tasks, res?.payload],
				},
			}));
		}
	};

	const deleteTask = (task, boardPosition) => {
		setBoardData((b) => ({
			...b,
			[boardPosition]: {
				...b[boardPosition],
				tasks: b[boardPosition].tasks.filter((t) => t._id !== task._id),
			},
		}));
		setSaveState('enabled');
	};

	const editTask = (boardPosition, taskId, value) => {
		if (isStrFalsy(value)) return;

		setBoardData((board) => ({
			...board,
			[boardPosition]: {
				...board[boardPosition],
				tasks: board[boardPosition].tasks.map((t) => (t._id === taskId ? { ...t, task_item: value } : t)),
			},
		}));
		setSaveState('enabled');
	};

	const updateListOrder = (key, taskArray) => {
		setBoardData((b) => ({
			...b,
			[key]: {
				...b[key],
				tasks: taskArray,
			},
		}));
		setSaveState('enabled');
	};

	useEffect(() => {
		const beforeUnloadListener = (event) => {
			event.preventDefault();
			return (event.returnValue = 'Are you sure you want to exit?');
		};
		if (saveState === 'enabled') {
			window.addEventListener('beforeunload', beforeUnloadListener, {
				capture: true,
			});
		}

		if (saveState === 'disabled') {
			setDeletedStack({ boards: [], tasks: [] });
		}

		return () =>
			window.removeEventListener('beforeunload', beforeUnloadListener, {
				capture: true,
			});
	}, [saveState]);

	return (
		<BoardDataContext.Provider
			value={{
				boardData,
				getBoardInformation,
				boardDataLoading,
				deleteBoardInfo,
				editBoardName,
				addNewBoard,
				saveState,
				setSaveState,
				deletedStack,
				setDeletedStack,
				saveChanges,
				addNewTask,
				deleteTask,
				editTask,
				updateListOrder,
			}}
		>
			{children}
		</BoardDataContext.Provider>
	);
};

export const useBoardData = () => useContext(BoardDataContext);
