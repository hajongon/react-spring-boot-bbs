import React, { useEffect, useState } from 'react'
import { getBoardList } from '../apis/board'
import { Link, useNavigate } from 'react-router-dom'

const BoardList = () => {
    const navigate = useNavigate()
    const [boardList, setBoardList] = useState([])

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

    useEffect(() => {
        fetchData() // fetchData 함수 호출
    }, [])

    return (
        <div>
            <ul>
                {boardList.map((board) => (
                    // 4) map 함수로 데이터 출력
                    <li key={board.idx}>
                        <Link to={`/board/${board.idx}`}>{board.title}</Link>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={onClick} value={1}>
                    &lt;&lt;
                </button>
                <button onClick={onClick} value={prevBlock}>
                    &lt;
                </button>
                {pageList.map((page, index) => (
                    <button key={index} onClick={onClick} value={page}>
                        {page}
                    </button>
                ))}
                <button onClick={onClick} value={nextBlock}>
                    &gt;
                </button>
                <button onClick={onClick} value={lastPage}>
                    &gt;&gt;
                </button>
            </div>
            <br />
            <div>
                <select name="sk" onChange={onChange}>
                    <option value="">-선택-</option>
                    <option value="title">제목</option>
                    <option value="contents">내용</option>
                </select>
                <input type="text" name="sv" id="" onChange={onChange} />
                <button onClick={onSearch}>검색</button>
            </div>
            <br />
            <div>
                <button onClick={moveToWrite}>글쓰기</button>
            </div>
        </div>
    )
}

export default BoardList
