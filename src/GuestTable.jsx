import React from 'react'
import { Rnd } from 'react-rnd'
import { useSetState } from 'ahooks'
import { Button, Card } from 'antd'

import TableSeat from './TableSeat'
import { antdSmallCardHeaderHeight, snapGridSize } from './helpers'
import { PlusOutlined } from '@ant-design/icons'

function GuestTable({ table, setTables }) {
	const [state, setState] = useSetState({ ...(table.rnd ?? {}) })

	const handleAddSeat = (e) => {
		e.stopPropagation()
		setTables((prevTables) => {
			return prevTables.map((x) => {
				if (x.id === table.id) {
					const serial = String(x.seats.length + 1)
					return {
						...x,
						seats: [
							...x.seats,
							{
								id: serial,
								seat_name: `Seat ${serial}`,
								guest_name: null,
								rnd: { width: 115, height: 50, x: 10, y: 10 },
							},
						],
					}
				}
				return x
			})
		})
	}

	return (
		<>
			<Rnd
				minWidth={100}
				minHeight={100}
				maxWidth={1000}
				maxHeight={1000}
				grid={[snapGridSize, snapGridSize]}
				size={{ width: state.width, height: state.height }}
				position={{ x: state.x, y: state.y }}
				onDrag={(e, d) => {
					e.stopImmediatePropagation()
					console.log('Table onDrag:', e, d)
					setState({ x: d.x, y: d.y })
				}}
				onResize={(e, direction, ref, delta, position) => {
					console.log('Table onResize:', e, direction, ref, delta, position)
					setState({
						width: parseInt(ref.style.width),
						height: parseInt(ref.style.height),
						...position,
					})
				}}
				bounds={'parent'}
			>
				<Card
					key={table.id}
					size='small'
					title={table.name}
					extra={
						<Button icon={<PlusOutlined />} onClick={handleAddSeat} size='small'>
							Add Seat
						</Button>
					}
					style={{ overflowY: 'scroll', height: state.height }}
					bodyStyle={{ padding: 0, height: state.height - antdSmallCardHeaderHeight }}
				>
					<div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#795548' }}>
						{table.seats.map((seat) => {
							return <TableSeat key={seat.id} seat={seat} />
						})}
					</div>
				</Card>
			</Rnd>
		</>
	)
}

export default GuestTable
