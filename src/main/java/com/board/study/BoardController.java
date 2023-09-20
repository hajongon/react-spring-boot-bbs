package com.board.study;

import com.board.study.db.BoardEntity;
import com.board.study.dto.BoardSaveDto;
import com.board.study.util.Header;
import com.board.study.util.Search;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Lombok 어노테이션으로, 생성자 인젝션을 자동으로 생성
@RequiredArgsConstructor
// Spring MVC 컨트롤러임을 나타내는 어노테이션
@RestController
public class BoardController {
    private final BoardService boardService;

    // HTTP Get 방식으로 /board 주소로 접근하면 게시글 목록을 조회
    @GetMapping("/board")
    // @RequestParam: HTTP 요청 파라미터를 읽어오는 어노테이션
    // getBoardList 메서드는 게시글 목록을 조회하며, 페이지 번호(page), 페이지 크기(size), 검색 조건(search)을 파라미터로 받는다.
    Header<List<BoardEntity>> getBoardList(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, Search search) {
        // boardService.getBoardList를 호출하여 게시글 목록을 조회하고 응답을 생성
        return boardService.getBoardList(page, size, search);
    }

    // HTTP Get 방식으로 /board/{idx} 주소로 접근하면 특정 게시글을 조회
    @GetMapping("/board/{idx}")
    // @PathVariable: URL 경로에 포함된 변수 값을 읽어오는 어노테이션
    // getBoardOne 메서드는 특정 게시글을 조회하며, 게시글의 고유 식별자(idx)를 경로 변수로 받는다.
    Header<BoardEntity> getBoardOne(@PathVariable Long idx) {
        // boardService.getBoardOne을 호출하여 특정 게시글을 조회하고 응답을 생성
        return boardService.getBoardOne(idx);
    }

    // HTTP Post 방식으로 /board 주소로 접근하면 새로운 게시글을 생성
    @PostMapping("/board")
    // @RequestBody: HTTP 요청 본문의 데이터를 읽어오는 어노테이션
    // createBoard 메서드는 새로운 게시글을 생성하며, 요청 본문에 포함된 데이터(boardSaveDto)를 받는다.
    Header<BoardEntity> createBoard(@RequestBody BoardSaveDto boardSaveDto) {
        // boardService.insertBoard를 호출하여 게시글을 생성하고 응답을 생성
        return boardService.insertBoard(boardSaveDto);
    }

    // HTTP Patch 방식으로 /board 주소로 접근하면 게시글을 수정
    @PatchMapping("/board")
    // @RequestBody: HTTP 요청 본문의 데이터를 읽어오는 어노테이션
    // updateBoard 메서드는 게시글을 수정하며, 요청 본문에 포함된 데이터(boardSaveDto)를 받는다.
    Header<BoardEntity> updateBoard(@RequestBody BoardSaveDto boardSaveDto) {
        // boardService.updateBoard를 호출하여 게시글을 수정하고 응답을 생성
        return boardService.updateBoard(boardSaveDto);
    }

    // HTTP Delete 방식으로 /board/{idx} 주소로 접근하면 특정 게시글을 삭제
    @DeleteMapping("/board/{idx}")
    // deleteBoard 메서드는 특정 게시글을 삭제하며, 게시글의 고유 식별자(idx)를 경로 변수로 받는다.
    Header<String> deleteBoard(@PathVariable Long idx) {
        // boardService.deleteBoard를 호출하여 게시글을 삭제하고 응답을 생성
        return boardService.deleteBoard(idx);
    }
}

// Controller는 클라이언트의 HTTP 요청에 따라 해당 기능을 수행하고, 
// Service 계층을 호출하여 비즈니스 로직을 처리한다. 
// 처리 결과는 Header 객체를 사용하여 응답으로 반환된다.