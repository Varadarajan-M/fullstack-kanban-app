const { isFalsy } = require('../helper');
const Board = require('../models/board.model');

const isBoardOwner = async (userId, boardId) => !isFalsy(await Board.exists({ _id: boardId, user_id: userId }));

module.exports = { isBoardOwner };
