//Khi giữ chuột di chuyển column title không bị blur
export const saveContentAfterPressEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
}
//Chọn tất cả input value khi click vào
export const SelectAllInlineText = (e) => {
    e.target.focus()
    e.target.select()
    // document.execCommand('selectAll', false, null)
}