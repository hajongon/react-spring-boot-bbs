import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBoard } from '../apis/board'
import Board from '../components/Board'

const BoardDetail = () => {
    const { idx } = useParams()
    const [loading, setLoading] = useState(true)
    const [board, setBoard] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getBoard(
                    `http://localhost:8080/board/${idx}`
                ) // 1) 게시글 목록 조회 함수 호출
                setBoard(data) // 3) 상태 업데이트
            } catch (error) {
                console.error('Error fetching board list:', error)
            }
        }

        fetchData() // fetchData 함수 호출
        setLoading(false)
    }, [])
    return (
        <div>
            {loading ? (
                <h2>loading...</h2>
            ) : (
                <Board
                    idx={board.idx}
                    title={board.title}
                    contents={board.contents}
                    createdBy={board.createdBy}
                />
            )}
        </div>
    )
}

export default BoardDetail
