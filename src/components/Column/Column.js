import React, { useEffect, useState, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from 'utilities/sorts'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { SelectAllInlineText, saveContentAfterPressEnter} from 'utilities/contentEditable'
import { cloneDeep } from 'lodash'

import './Column.scss'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal.'
import { createNewCard,updateColumn } from 'action/ApiCall'

function Column(props) {
  const { column, onCardDrop, onUpdateColumnState } = props
  const cards = mapOrder(column.cards, column.cardOrder, '_id')

  const [showConfirmModal, setshowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () => setshowConfirmModal(!showConfirmModal)
  
  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = (e) => setColumnTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardFrom = () => setOpenNewCardForm(!openNewCardForm)

  const newCardTextareaRef = useRef(null)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus()
      newCardTextareaRef.current.select()
    }
    }, [openNewCardForm])
  //Remove column
  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      // Xóa cột 
      const newColumn = {
        ...column,
        _destroy: true
      }
      //Call API update column
      updateColumn(newColumn._id, newColumn).then(updatedColumn => {
        onUpdateColumnState(updatedColumn)
      })
    }
    toggleShowConfirmModal()
  }
  //Update column title
  const handleColumnTitleBlur = () => {
    if (columnTitle !== column.title) {
      const newColumn = {
        ...column,
        title: columnTitle
      }
      //Call API update column
      updateColumn(newColumn._id, newColumn).then(updatedColumn => {
      updatedColumn.cards = newColumn.cards
      onUpdateColumnState(updatedColumn)
      })
    }
  }
  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus()
      return
    }
    const newCardToAdd = {
      boardId: column.boardId,
      columnId: column._id,
      title: newCardTitle.trim()
    }
    //Call API 
    createNewCard(newCardToAdd).then(card => {
      let newColumn = cloneDeep(column)
      newColumn.cards.push(card)
      newColumn.cardOrder.push(card._id)

      onUpdateColumnState(newColumn)
      setNewCardTitle('')
      toggleOpenNewCardFrom()
    })
  }
  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control 
            size="sm" 
            type="text" 
            className="wise-space-content-editable"
            value={columnTitle}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown= {saveContentAfterPressEnter}
            onClick={SelectAllInlineText}
            onMouseDown={e => e.preventDefault()}
            spellCheck="false"
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm" className="dropdown-btn"/>

          <Dropdown.Menu>
            <Dropdown.Item onClick={toggleOpenNewCardFrom}>Thêm thẻ...</Dropdown.Item>
            <Dropdown.Item onClick={toggleShowConfirmModal}>Xóa cột...</Dropdown.Item>
            <Dropdown.Item>Di chuyển tất cả thẻ trong cột (Coming soon)...</Dropdown.Item>
            <Dropdown.Item>Lưu trữ tất cả thẻ trong cột (Coming soon)...</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        
      </header>
      <div className="card-list">
        <Container
          groupName="col"
          orientation="vertical"
          onDrop={dropResult => onCardDrop(column._id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          
          dropPlaceholder={{                      
            animationDuration: 150,
            howOnTop: true,
            className: 'card-drop-preview' 
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card  card={card}/>
            </Draggable>
          ))}
        </Container>
        {openNewCardForm &&
          <div className="add-new-card-area">
            <Form.Control 
              size="sm" 
              as="textarea" 
              rows="3"
              placeholder="Nhập tiêu đề cho thẻ..."
              className="textarea-enter-new-card"
              ref={newCardTextareaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewCard()}
            />
          </div>
        }
      </div>
      <footer>
        {openNewCardForm &&
          <div className="add-new-card-actions">
            <Button variant="success" size="sm" onClick={addNewCard}>Thêm thẻ</Button>
            <span className="cancel-icon" onClick={toggleOpenNewCardFrom}>
              <i className="fa fa-trash icon"/>
            </span>
          </div>
        }
        {!openNewCardForm && 
          <div className="footer-actions" onClick={toggleOpenNewCardFrom}>
            <i className="fa fa-plus icon"/> Thêm thẻ khác
          </div>
        }
      </footer>

      <ConfirmModal
        show = {showConfirmModal}
        onAction = {onConfirmModalAction}
        title = "Xóa cột"
        content = {`Bạn có chắc chắn xóa <strong>${column.title}</strong> không? Tất cả thẻ liên quan sẽ bị xóa!`}
      />
    </div>
  )
}

export default Column