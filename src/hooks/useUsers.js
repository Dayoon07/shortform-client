import { useState, useEffect, useCallback } from "react";

/**
 * 로그인된 사용자 정보를 가져오고 관리하는 커스텀 훅
 */
export function useUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
        return {
            user: user,
            message: "유저 데이터가 있습니다."
        };
    } else {
        return {
            user: null,
            message: "유저 데이터가 없습니다. 로그인을 해주세요."
        }
    }
}
