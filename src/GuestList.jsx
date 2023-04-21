import React from 'react'
import { useDrag } from 'react-dnd'

import guests from './guests.json'

const GuestList = () => {
	return (
		<>
			<h2>Drag below guests to the appropriate seat.</h2>
			{guests.map((guest) => (
				<GuestItem key={guest.id} guest={guest} />
			))}
		</>
	)
}

export default GuestList

const GuestItem = ({ guest }) => {
	const [{ isDragging }, drag] = useDrag({
		type: 'guest',
		item: () => guest,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	})

	return (
		<div
			className='ant-card ant-card-bordered ant-card-small'
			size='small'
			key={guest.id}
			ref={drag}
			style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
		>
			<div className='ant-card-body'>{guest.name}</div>
		</div>
	)
}
