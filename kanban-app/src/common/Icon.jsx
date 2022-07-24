import React from 'react';

const Icon = ({ type, tooltip, onClick }) => {
	return (
		<span
			onClick={onClick}
			title={tooltip}
			role='button'
			className='material-symbols-outlined custom-icon'
		>
			{type}
		</span>
	);
};

export default Icon;
