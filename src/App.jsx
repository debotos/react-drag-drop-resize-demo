import 'antd/dist/antd.css'
import './App.css'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Col, Row } from 'antd'
import GuestTable from './GuestTable'

import tables from './data.json'
import GuestList from './GuestList'

function App() {
	return (
		<>
			<DndProvider backend={HTML5Backend}>
				<Row style={{ padding: 20, height: '100vh' }}>
					<Col span={6}>
						<GuestList />
					</Col>
					<Col span={18}>
						<div style={{ height: '100%', width: '100%' }}>
							{tables.map((table) => {
								return <GuestTable key={table.id} table={table} />
							})}
						</div>
					</Col>
				</Row>
			</DndProvider>
		</>
	)
}

export default App
