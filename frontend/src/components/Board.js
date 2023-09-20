import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteBoard } from '../apis/board'

const Board = ({ idx, title, contents, createdBy }) => {
    const navigate = useNavigate()
    const moveToUpdate = () => {
        navigate('/update/' + idx)
    }
    const deleteCurrentBoard = async () => {
        if (window.confirm('글을 삭제하시겠습니까?')) {
            const res = await deleteBoard(`http://localhost:8080/board/${idx}`)
            if (res === 'success') {
                alert('글이 삭제되었습니다.')
                navigate('/board')
            } else {
                alert('문제가 발생했습니다. 다시 시도해주세요.')
            }
        }
    }
    const moveToList = () => {
        navigate('/board')
    }
    return (
        <div>
            <div>
                <h2>{title}</h2>
                <h5>{createdBy}</h5>
                <hr />
                <p>{contents}</p>
            </div>
            <div>
                <button onClick={moveToUpdate}>수정</button>
                <button onClick={deleteCurrentBoard}>삭제</button>
                <button onClick={moveToList}>목록</button>
            </div>
        </div>
    )
}

export default Board
