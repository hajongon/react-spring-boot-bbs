import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBoard, updateBoard } from '../apis/board'
import './BoardUpdate.css'

const BoardUpdate = () => {
    const navigate = useNavigate()
    const { idx } = useParams() // /update/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [board, setBoard] = useState({
        idx: 0,
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

    const fetchBoard = async () => {
        const { data } = await getBoard(`http://localhost:8080/board/${idx}`)
        setBoard(data)
    }

    const patchBoard = async () => {
        const res = await updateBoard(`http://localhost:8080/board`, board)
        if (res.data) {
            alert('수정되었습니다.')
            navigate('/board/' + idx)
        }
    }

    const backToDetail = () => {
        navigate('/board/' + idx)
    }

    useEffect(() => {
        fetchBoard()
    }, [])

    return (
        <div className="update-container">
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
                <button onClick={patchBoard}>수정</button>
                <button onClick={backToDetail}>취소</button>
            </div>
        </div>
    )
}

export default BoardUpdate
