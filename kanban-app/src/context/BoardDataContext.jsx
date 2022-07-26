import { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getBoardInfo,
	isResOk,
	updateBoard,
	getUser,
	addBoard,
} from '../api/helper';
import { isStrFalsy } from '../util';
import { removeKey, setValue, useInstantUpdate } from './../user-boards/helper';

const BoardDataContext = createContext({});

export const BoardDataContextProvider = ({ children }) => {
	const [boardData, setBoardData] = useState({});
	const [boardDataLoading, setBoardDataLoading] = useState(false);
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
			board_position: Object.keys(boardData).length + 1,
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

	return (
		<BoardDataContext.Provider
			value={{
				boardData,
				getBoardInformation,
				boardDataLoading,
				deleteBoardInfo,
				editBoardName,
				addNewBoard,
			}}
		>
			{children}
		</BoardDataContext.Provider>
	);
};

export const useBoardData = () => useContext(BoardDataContext);
