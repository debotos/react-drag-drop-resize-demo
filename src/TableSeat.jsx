import React from 'react'
import { Rnd } from 'react-rnd'
import { useSafeState, useSetState } from 'ahooks'
import { useDrop } from 'react-dnd'

import { snapGridSize } from './helpers'

function TableSeat({ seat }) {
	const [guest, setGuest] = useSafeState(null)
	const [state, setState] = useSetState({ ...(seat.rnd ?? {}) })

	const onDrop = (item) => {
		console.log('Guest dropped:', item)
		setGuest(item)
	}

	const [{ isOver }, drop] = useDrop({
		accept: 'guest',
		drop: onDrop,
		collect: (monitor) => ({ canDrop: !!monitor.canDrop(), isOver: !!monitor.isOver() }),
	})

	return (
		<>
			<Rnd
				minWidth={50}
				minHeight={50}
				maxWidth={500}
				maxHeight={500}
				grid={[snapGridSize, snapGridSize]}
				size={{ width: state.width, height: state.height }}
				position={{ x: state.x, y: state.y }}
				onDrag={(e, d) => {
					e.stopImmediatePropagation()
					console.log('Seat onDrag:', e, d)
					setState({ x: d.x, y: d.y })
				}}
				onResize={(e, direction, ref, delta, position) => {
					console.log('Seat onResize:', e, direction, ref, delta, position)
					setState({
						width: parseInt(ref.style.width),
						height: parseInt(ref.style.height),
						...position,
					})
				}}
				bounds={'parent'}
			>
				<div
					key={seat.id}
					ref={drop}
					className='ant-card ant-card-bordered ant-card-small'
					style={{
						overflowY: 'scroll',
						height: state.height,
						padding: '3px 5px',
						color: '#fff',
						background: '#9c27b0',
						border: isOver ? '1px solid red' : '1px solid #fff',
					}}
				>
					{seat.seat_name} {guest ? `- ${guest?.name}` : '(Empty)'}
				</div>
			</Rnd>
		</>
	)
}

export default TableSeat
