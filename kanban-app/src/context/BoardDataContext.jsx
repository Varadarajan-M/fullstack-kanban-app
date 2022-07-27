import { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getBoardInfo,
	isResOk,
	updateBoard,
	getUser,
	addBoard,
	saveAllChanges,
} from '../api/helper';
import { isStrFalsy } from '../util';
import { removeKey, setValue, useInstantUpdate } from './../user-boards/helper';

const BoardDataContext = createContext({});

export const BoardDataContextProvider = ({ children }) => {
	const [boardData, setBoardData] = useState({});
	const [boardDataLoading, setBoardDataLoading] = useState(false);
	const [saveState, setSaveState] = useState('disabled');
	const [deletedStack, setDeletedStack] = useState({ boards: [], tasks: [] });
	const navigate = useNavigate();
	const { performInstantUpdate } = useInstantUpdate(setBoardData);

	const getBoardInformation = useCallback(async () => {
		setBoardDataLoading(true);
		const res = await getBoardInfo(getUser());
		if (isResOk(res)) {
			setBoardData(res.payload);
			setBoardDataLoading(false);
		} else {
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
			const tasks = board.tasks.reduce(
				(ac, task, index) => [...ac, { ...task, task_position: index }],
				[],
			);
			payload.tasks.push(tasks);
		});
		payload.tasks = payload.tasks.flat();

		const res = await saveAllChanges(payload, getUser());
		if (isResOk(res)) setSaveState('disabled');
	};

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
			}}
		>
			{children}
		</BoardDataContext.Provider>
	);
};

export const useBoardData = () => useContext(BoardDataContext);
