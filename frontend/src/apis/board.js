import axios from 'axios'

export const getBoardList = async (url) => {
    try {
        const res = await axios.get(url)
        return res.data // 성공한 경우 응답 데이터를 반환
    } catch (error) {
        if (error.response) {
            // 서버로부터 응답이 왔지만 에러 상태 코드가 있는 경우
            console.error('HTTP Error:', error.response.status)
            console.error('Error Response Data:', error.response.data)
        } else if (error.request) {
            // 요청은 보냈지만 응답이 없는 경우 (네트워크 문제 등)
            console.error('No Response from Server')
        } else {
            // 요청을 보내기 전에 발생한 에러
            console.error('Request Error:', error.message)
        }
        return 'error' // 에러 메시지를 반환
    }
}

export const getBoard = async (url) => {
    try {
        const res = await axios.get(url)
        console.log(res)
        return res.data // 성공한 경우 응답 데이터를 반환
    } catch (error) {
        if (error.response) {
            console.error('HTTP Error:', error.response.status)
            console.error('Error Response Data:', error.response.data)
        } else if (error.request) {
            console.error('No Response from Server')
        } else {
            console.error('Request Error:', error.message)
        }
        return 'error'
    }
}

export const postBoard = async (url, board) => {
    try {
        const res = await axios.post(url, board)
        console.log(res)
        return res.data
    } catch (error) {
        if (error.response) {
            console.error('HTTP Error:', error.response.status)
            console.error('Error Response Data:', error.response.data)
        } else if (error.request) {
            console.error('No Response from Server')
        } else {
            console.error('Request Error:', error.message)
        }
        return 'error'
    }
}

export const deleteBoard = async (url) => {
    try {
        const res = await axios.delete(url)
        return 'success'
    } catch (error) {
        if (error.response) {
            console.error('HTTP Error:', error.response.status)
            console.error('Error Response Data:', error.response.data)
        } else if (error.request) {
            console.error('No Response from Server')
        } else {
            console.error('Request Error:', error.message)
        }
        return 'error'
    }
}

export const updateBoard = async (url, board) => {
    try {
        const res = await axios.patch(url, board)
        return res.data
    } catch (error) {
        if (error.response) {
            console.error('HTTP Error:', error.response.status)
            console.error('Error Response Data:', error.response.data)
        } else if (error.request) {
            console.error('No Response from Server')
        } else {
            console.error('Request Error:', error.message)
        }
        return 'error'
    }
}
