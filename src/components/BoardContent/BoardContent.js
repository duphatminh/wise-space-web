import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button} from 'react-bootstrap'
import { isEmpty } from 'lodash'

import './BoardContent.scss'
import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import { initialData } from 'action/initialData'


function BoardContent() {
    const [board, setBoard]=useState({})
    const [columns, setColumns]=useState([])
    const [openNewColumnForm, setOpenNewColumForm] = useState(false)

    const newColumnInputRef = useRef(null)

    const [newColumnTitle, setNewColumnTitle] = useState('')
    const onNewColumnTitleChange = useCallback((e) => setNewColumnTitle(e.target.value), [])

    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
        if (boardFromDB) {
            setBoard(boardFromDB)

            //Sắp xếp lại column (sort column )
            // boardFromDB.columns.sort(function(a,b) {
            //     return boardFromDB.columnOrder.indexOf(a.id) - boardFromDB.columnOrder.indexOf(b.id)
            // })
            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        }
    }, [])

    useEffect(() => {
        if (newColumnInputRef && newColumnInputRef.current) {
            newColumnInputRef.current.focus()
            newColumnInputRef.current.select()
        }
    }, [openNewColumnForm])

    if (isEmpty(board)) {
        return <div className="not-found" style={{ 'padding': '10px', 'color': 'brown' }}>Board not found</div>
    }
    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)

        let newBoard = {...board}
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
    }
    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find(c => c.id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder =currentColumn.cards.map(i => i.id)
            console.log(newColumns)
            setColumns(newColumns)
        }
    }
    const toggleOpenNewColumnFrom = () => setOpenNewColumForm(!openNewColumnForm)
    
    const addNewColumn = () => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus()
            return
        }
        const newColumnToAdd = {
            id: Math.random().toString(36).substring(2, 5), //Random 1 string có 5 ký tự và ngẫu nhiên, sẽ xóa khi thực hiện code API
            boardId: board.id,
            title: newColumnTitle.trim(),
            cardOrder: [],
            cards: []
        }

        let newColumns = [...columns]
        newColumns.push(newColumnToAdd)

        let newBoard = {...board}
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns
        
        setColumns(newColumns)
        setBoard(newBoard)
        setNewColumnTitle('')
        toggleOpenNewColumnFrom()
    }

    return (
        <div className='board-content'>
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index}>
                        <Column  column={column} onCardDrop={onCardDrop}/>
                    </Draggable>
                ))}
            </Container> 
            <BootstrapContainer className="wise-space-container">
                {!openNewColumnForm &&
                    <Row>
                        <Col className="add-new-column" onClick={toggleOpenNewColumnFrom}>
                            <i className="fa fa-plus icon"/>Thêm cột mới
                        </Col>
                    </Row>
                }
                {openNewColumnForm &&
                    <Row>
                        <Col className="enter-new-column">
                            <Form.Control 
                                size="sm" 
                                type="text" 
                                placeholder="Nhập tiêu đề cột..."
                                className="input-enter-new-column"
                                ref={newColumnInputRef}
                                value={newColumnTitle}
                                onChange={onNewColumnTitleChange}
                                onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
                            />
                            <Button variant="success" size="sm" onClick={ addNewColumn }>Thêm cột</Button>
                            <span className="cancel-new-column" onClick={toggleOpenNewColumnFrom}>
                                <i className="fa fa-trash icon"/>
                            </span>
                        </Col>
                    </Row>
                }
            </BootstrapContainer>
      </div>
    )
}

export default BoardContent