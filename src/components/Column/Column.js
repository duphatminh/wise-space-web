import React, { useCallback, useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from 'utilities/sorts'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { Dropdown, Form } from 'react-bootstrap'
import { SelectAllInlineText, saveContentAfterPressEnter} from 'utilities/contentEditable'

import './Column.scss'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal.'

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const [showConfirmModal, setshowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () => setshowConfirmModal(!showConfirmModal)
  
  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      // Xóa cột 
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModal()
  }
  

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
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
            <Dropdown.Item>Thêm thẻ...</Dropdown.Item>
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
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
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
      </div>
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon"/> Thêm thẻ khác
        </div>
      </footer>

      <ConfirmModal
        show = {showConfirmModal}
        onAction = {onConfirmModalAction}
        title = "Xóa cột"
        content = {'Bạn có chắc chắn xóa ${column.title} không? Tất cả thẻ liên quan sẽ bị xóa!'}
      />
    </div>
  )
}

export default Column