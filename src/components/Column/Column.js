import React from "react";

import './Column.scss'
import Task from "components/Task/Task";

function Column() {
    return (
        <div className='columns'>
          <header>DOING DOING</header>
          <ul className="task-list">
            <Task/>
            <li className="task-item">Tao sẽ thử mày</li>
            <li className="task-item">Tao sẽ thử mày</li>
            <li className="task-item">Tao sẽ thử mày</li>
            <li className="task-item">Tao sẽ thử mày</li> 
            <li className="task-item">Tao sẽ thử mày</li>
            <li className="task-item">Tao sẽ thử mày</li>
            <li className="task-item">Tao sẽ thử mày</li>
          </ul>
          <footer>Add another Card</footer>
        </div>
    )
}

export default Column