package com.board.study.db;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

// 이 인터페이스가 MyBatis의 Mapper 역할을 하도록 지정
@Mapper
public interface BoardMapper {
    /*
        mapper xml 파일의 resultType에 해당하는 클래스에 결과를 담으며,
        N개가 될 수 있으므로 List로 Return 타입을 설정
    */

    // 게시글 목록을 가져오는 메서드. paramMap 파라미터를 통해 검색 조건 등을 전달하고, 결과를 List<BoardEntity> 형태로 반환
    List<BoardEntity> getBoardList(HashMap<String, Object> paramMap);

    // 게시글 총 개수를 가져오는 쿼리
    // 검색 조건에 따라 게시글의 총 개수를 반환.
    int getBoardTotalCount(HashMap<String, Object> paramMap);

    // 게시글 한 개를 가져오는 쿼리
    // 게시글의 고유한 식별자(idx)를 파라미터로 받고, 해당 게시글을 반환
    BoardEntity getBoardOne(Long idx);

    // 게시글을 새로 등록하는 쿼리
    // BoardEntity 객체를 파라미터로 받아서 데이터베이스에 등록하고, 등록된 행의 개수를 반환
    int insertBoard(BoardEntity entity);

    // 게시글을 수정하는 쿼리
    // BoardEntity 객체를 파라미터로 받아서 해당 게시글을 수정하고, 수정된 행의 개수를 반환
    int updateBoard(BoardEntity entity);

    // 게시글을 삭제하는 쿼리
    // 게시글의 고유한 식별자(idx)를 파라미터로 받아서 해당 게시글을 삭제하고, 삭제된 행의 개수를 반환
    int deleteBoard(Long idx);
}
