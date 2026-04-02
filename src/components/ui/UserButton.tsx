"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";

export default function UserButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-10 h-10 bg-white/20 rounded-full animate-pulse" />
    );
  }

  if (!session) {
    return (
      <Link
        href="/auth/login"
        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-medium transition-colors"
      >
        로그인
      </Link>
    );
  }

  return (
    <Link href="/profile" className="block">
      {session.user?.image ? (
        <Image
          src={session.user.image}
          alt="Profile"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full border-2 border-white/50 hover:border-white transition-colors"
        />
      ) : (
        <div className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </Link>
  );
}
