const registerApp = require('./app');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const main = async () => {
	const app = await registerApp();

	app.listen(PORT, () => {
		console.log(
			`Listening on Port ${PORT}\nGo to http://localhost:${PORT}`,
		);
	});
};

main().catch((e) => console.log(`Something went wrong : Error ${e}`));
