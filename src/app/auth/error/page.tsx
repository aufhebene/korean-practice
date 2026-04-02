"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return "서버 설정에 문제가 있습니다. 관리자에게 문의해주세요.";
      case "AccessDenied":
        return "접근이 거부되었습니다.";
      case "Verification":
        return "인증 토큰이 만료되었거나 이미 사용되었습니다.";
      case "OAuthSignin":
        return "OAuth 로그인 시작 중 오류가 발생했습니다.";
      case "OAuthCallback":
        return "OAuth 콜백 처리 중 오류가 발생했습니다.";
      case "OAuthCreateAccount":
        return "계정 생성 중 오류가 발생했습니다.";
      case "EmailCreateAccount":
        return "이메일 계정 생성 중 오류가 발생했습니다.";
      case "Callback":
        return "콜백 처리 중 오류가 발생했습니다.";
      case "OAuthAccountNotLinked":
        return "이 이메일은 이미 다른 로그인 방법으로 등록되어 있습니다.";
      case "SessionRequired":
        return "이 페이지에 접근하려면 로그인이 필요합니다.";
      default:
        return "인증 중 알 수 없는 오류가 발생했습니다.";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm text-center"
    >
      {/* 아이콘 */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-error" />
        </div>
      </div>

      {/* 타이틀 */}
      <h1 className="text-2xl font-bold text-foreground mb-2">
        로그인 오류
      </h1>

      {/* 에러 메시지 */}
      <p className="text-muted mb-8">
        {getErrorMessage(error)}
      </p>

      {/* 버튼 */}
      <div className="space-y-3">
        <Link href="/auth/login" className="block">
          <Button className="w-full">
            다시 로그인하기
          </Button>
        </Link>

        <Link href="/" className="block">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Button>
        </Link>
      </div>

      {/* 에러 코드 */}
      {error && (
        <p className="mt-8 text-xs text-muted">
          에러 코드: {error}
        </p>
      )}
    </motion.div>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full max-w-sm text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full animate-pulse" />
      </div>
      <div className="h-8 bg-gray-100 rounded mb-4 animate-pulse" />
      <div className="h-4 bg-gray-100 rounded mb-8 animate-pulse" />
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col items-center justify-center p-4">
      <Suspense fallback={<LoadingFallback />}>
        <AuthErrorContent />
      </Suspense>
    </div>
  );
}
