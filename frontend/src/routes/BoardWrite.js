import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postBoard } from '../apis/board'
import './BoardWrite.css'

const BoardWrite = () => {
    const navigate = useNavigate()

    const [board, setBoard] = useState({
        title: '',
        createdBy: '',
        contents: '',
    })

    const { title, createdBy, contents } = board //비구조화 할당

    const onChange = (event) => {
        const { value, name } = event.target //event.target에서 name과 value만 가져오기
        setBoard({
            ...board,
            [name]: value,
        })
    }

    const saveBoard = async () => {
        const res = await postBoard('http://localhost:8080/board', board)
        console.log(res)
        alert('작성하신 글이 등록되었습니다.')
        navigate('/board')
    }

    const backToList = () => {
        navigate('/board')
    }

    return (
        <div className="write-container">
            <div className="title-box">
                <label htmlFor="title">제목</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={onChange}
                />
            </div>
            <div className="author-box">
                <label htmlFor="createdBy">작성자</label>
                <input
                    type="text"
                    name="createdBy"
                    id="createdBy"
                    value={createdBy}
                    readOnly={true}
                />
            </div>
            <div className="content-box">
                <label htmlFor="contents">내용</label>
                <textarea
                    name="contents"
                    id="contents"
                    cols="30"
                    rows="10"
                    value={contents}
                    onChange={onChange}
                ></textarea>
            </div>
            <div className="button-box">
                <button onClick={saveBoard}>저장</button>
                <button onClick={backToList}>취소</button>
            </div>
        </div>
    )
}

export default BoardWrite
