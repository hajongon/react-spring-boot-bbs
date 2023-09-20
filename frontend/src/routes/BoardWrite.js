import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { postBoard } from '../apis/board'

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
        <div>
            <div>
                <span>제목</span>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChange}
                />
            </div>
            <br />
            <div>
                <span>작성자</span>
                <input
                    type="text"
                    name="createdBy"
                    value={createdBy}
                    onChange={onChange}
                />
            </div>
            <br />
            <div>
                <span>내용</span>
                <textarea
                    name="contents"
                    cols="30"
                    rows="10"
                    value={contents}
                    onChange={onChange}
                ></textarea>
            </div>
            <br />
            <div>
                <button onClick={saveBoard}>저장</button>
                <button onClick={backToList}>취소</button>
            </div>
        </div>
    )
}

export default BoardWrite
