import React, { useEffect, useState } from 'react'
import { getBoardList } from '../apis/board'
import { Link, useNavigate } from 'react-router-dom'
import './BoardList.css'

const BoardList = () => {
    const navigate = useNavigate()
    const [boardList, setBoardList] = useState([])

    console.log(boardList)

    const [pageList, setPageList] = useState([])

    const [curPage, setCurPage] = useState(0) // 현재 페이지 세팅
    const [prevBlock, setPrevBlock] = useState(0) // 이전 페이지 블록
    const [nextBlock, setNextBlock] = useState(0) // 다음 페이지 블록
    const [lastPage, setLastPage] = useState(0) // 마지막 페이지

    const [search, setSearch] = useState({
        page: 1,
        sk: '',
        sv: '',
    })

    const moveToWrite = () => {
        navigate('/write')
    }

    const fetchData = async (updatedSearch, cur = curPage) => {
        if (updatedSearch && updatedSearch.page === +cur) return // 현재 페이지와 누른 페이지가 같으면 return
        if (!updatedSearch) {
            updatedSearch = { page: 1, sk: '', sv: '' } // 빈 객체로 초기화 또는 기본 값을 설정
        }
        console.log(updatedSearch)
        const queryString = Object.entries(updatedSearch)
            .map((el) => el.join('='))
            .join('&')

        try {
            const res = await getBoardList(
                'http://localhost:8080/board?' + queryString
            )
            setBoardList(res.data)
            const pngn = res.pagination

            const { endPage, nextBlock, prevBlock, startPage, totalPageCnt } =
                pngn

            setCurPage(search.page)
            setPrevBlock(prevBlock)
            setNextBlock(nextBlock)
            setLastPage(totalPageCnt)

            const tmpPages = []
            for (let i = startPage; i <= endPage; i++) {
                tmpPages.push(i)
            }

            setPageList(tmpPages)
        } catch (error) {
            console.error('Error fetching board list:', error)
        }
    }

    const onClick = async (event) => {
        let value = event.target.value
        const updatedSearch = { ...search, page: value }
        setSearch(updatedSearch)
        await fetchData(updatedSearch)
    }

    const onChange = (event) => {
        const { value, name } = event.target // event.target에서 name과 value만 가져오기
        setSearch((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const onSearch = async () => {
        if (search.sk !== '' && search.sv !== '') {
            const updatedSearch = { ...search, page: 1 }
            setSearch((prev) => ({
                ...prev,
                page: 1,
            }))
            setCurPage(0)
            await fetchData(updatedSearch, 0)
        }
    }

    // timestamp를 "YYYY-MM-DD" 형태로 변환하는 함수
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1)
        const day = String(date.getDate())
        return `${year}년 ${month}월 ${day}일`
    }

    useEffect(() => {
        fetchData() // fetchData 함수 호출
    }, [])

    return (
        <div className="container">
            <table className="board-table">
                <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>글 제목</th>
                        <th>작성일</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.map((board) => (
                        <tr key={board.idx}>
                            <td>{board.idx}</td>
                            <td>
                                <Link to={`/board/${board.idx}`}>
                                    {board.title}
                                </Link>
                            </td>
                            <td>{formatTimestamp(board.createdAt)}</td>
                            <td>{board.createdBy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="buttons">
                <button onClick={onClick} value={1}>
                    첫 페이지
                </button>
                <button onClick={onClick} value={prevBlock}>
                    이전
                </button>
                {pageList.map((page, index) => (
                    <button key={index} onClick={onClick} value={page}>
                        {page}
                    </button>
                ))}
                <button onClick={onClick} value={nextBlock}>
                    다음
                </button>
                <button onClick={onClick} value={lastPage}>
                    마지막 페이지
                </button>
            </div>
            <div className="underTheBoardBox">
                <div className="searchBox">
                    <select name="sk" onChange={onChange}>
                        <option value="">-선택-</option>
                        <option value="title">제목</option>
                        <option value="contents">내용</option>
                    </select>
                    <input type="text" name="sv" id="" onChange={onChange} />
                    <button onClick={onSearch}>검색</button>
                </div>
                <br />
                <div className="writeButton">
                    <button onClick={moveToWrite}>글쓰기</button>
                </div>
            </div>
        </div>
    )
}

export default BoardList
