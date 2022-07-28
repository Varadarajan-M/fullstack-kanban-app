import React from 'react';

const Icon = ({ type, tooltip, onClick, className }) => {
	const classes = `${
		className ?? 'icn'
	} material-symbols-outlined custom-icon`;
	return (
		<span
			onClick={onClick}
			title={tooltip}
			role='button'
			className={classes}
		>
			{type}
		</span>
	);
};

export default Icon;
