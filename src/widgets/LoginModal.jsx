import { useState } from "react";
import Modal from "./Modal";
import { loginUser } from "../../services/authService";

export default function LoginModal({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await loginUser(username, password);
      
      if (data.success) {
        window.location.href = `/?login=success&message=${encodeURIComponent(data.message)}`;
      } else {
        alert(`로그인 실패: ${data.message || '사용자명 또는 비밀번호가 올바르지 않습니다.'}`);
      }
    } catch (error) {
      console.error('로그인 요청 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} title="로그인">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="사용자 이름"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-gray-400 focus:outline-none"
          disabled={isLoading}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-gray-400 focus:outline-none"
          disabled={isLoading}
          required
        />
        <button 
          type="submit" 
          className="w-full py-3 rounded-xl font-bold bg-gray-700 hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </Modal>
  );
}