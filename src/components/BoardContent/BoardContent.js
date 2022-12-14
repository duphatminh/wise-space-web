import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button} from 'react-bootstrap'
import { isEmpty,cloneDeep } from 'lodash'

import './BoardContent.scss'
import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import { fetchBoardDetails,createNewColumn, updateBoard,updateColumn,updateCard } from 'action/ApiCall'

function BoardContent() {
    const [board, setBoard]=useState({})
    const [columns, setColumns]=useState([])
    const [openNewColumnForm, setOpenNewColumForm] = useState(false)
    const toggleOpenNewColumnFrom = () => setOpenNewColumForm(!openNewColumnForm)

    const newColumnInputRef = useRef(null)

    const [newColumnTitle, setNewColumnTitle] = useState('')
    const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

    useEffect(() => {
        const boardId = '637910b8b2cac673bcd9c549'
        fetchBoardDetails(boardId).then(board => {
            // console.log(board)
            setBoard(board)
            setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
        })
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
        let newColumns = cloneDeep(columns)
        newColumns = applyDrag(newColumns, dropResult)

        let newBoard = cloneDeep(board)
        newBoard.columnOrder = newColumns.map(c => c._id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
        //Call API update columnOrder in board details.
        updateBoard(newBoard._id, newBoard).catch(() => {
            setColumns(columns)
            setBoard(board)
        })
    }
    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns]

            let currentColumn = newColumns.find(c => c._id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(i => i._id)

            setColumns(newColumns)
            if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
                // console.log('1')
                /**
                 * Action: move card inside its column 
                 * + Call API update cardOrder in current column
                 */
                updateColumn(currentColumn._id, currentColumn).catch(() => setColumns(columns)) 
            } else {
                // console.log('2')
                /**
                * Action: move card between two columns
                */
                //+ Call API update cardOrder in current column
                updateColumn(currentColumn._id, currentColumn).catch(() => setColumns(columns))
                if (dropResult.addedIndex !== null) {
                    let currentCard = cloneDeep(dropResult.payload)
                    currentCard.columnId = currentColumn._id
                    //+ Call API update columnId in current card:
                    // console.log(currentCard)
                    updateCard(currentCard._id, currentCard)
                }
            }
        }
    }
    const addNewColumn = () => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus()
            return
        }
        const newColumnToAdd = {
            boardId: board._id,
            title: newColumnTitle.trim()
        }
        //Call API 
        createNewColumn(newColumnToAdd).then(column => {
            let newColumns = [...columns]
            newColumns.push(column)

            let newBoard = {...board}
            newBoard.columnOrder = newColumns.map(c => c._id)
            newBoard.columns = newColumns
        
            setColumns(newColumns)
            setBoard(newBoard)
            setNewColumnTitle('')
            toggleOpenNewColumnFrom()
        })
    }
    const onUpdateColumnState = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate._id

        let newColumns = [...columns]
        const columnIndexToUpdate = newColumns.findIndex(i => i._id === columnIdToUpdate)

        if (newColumnToUpdate._destroy) {
            // X??a c???t
            newColumns.splice(columnIndexToUpdate, 1)
        }
        else {
            //C???p nh???t l???i th??ng tin c???t
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
        }
        let newBoard = {...board}
        newBoard.columnOrder = newColumns.map(c => c._id)
        newBoard.columns = newColumns
        
        setColumns(newColumns)
        setBoard(newBoard)
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
                        <Column  
                            column={column} 
                            onCardDrop={onCardDrop} 
                            onUpdateColumnState={onUpdateColumnState}
                        />
                    </Draggable>
                ))}
            </Container> 
            <BootstrapContainer className="wise-space-container">
                {!openNewColumnForm &&
                    <Row>
                        <Col className="add-new-column" onClick={toggleOpenNewColumnFrom}>
                            <i className="fa fa-plus icon"/>   Th??m c???t m???i
                        </Col>
                    </Row>
                }
                {openNewColumnForm &&
                    <Row>
                        <Col className="enter-new-column">
                            <Form.Control 
                                size="sm" 
                                type="text" 
                                placeholder="Nh???p ti??u ????? c???t..."
                                className="input-enter-new-column"
                                ref={newColumnInputRef}
                                value={newColumnTitle}
                                onChange={onNewColumnTitleChange}
                                onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
                            />
                            <Button variant="success" size="sm" onClick={ addNewColumn }>Th??m c???t</Button>
                            <span className="cancel-icon" onClick={toggleOpenNewColumnFrom}>
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