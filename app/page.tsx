"use client";
import Image from "next/image";
import Link from "next/link";
import ProfileAvatar from "./_components/ProfileAvatar";
import { useAuthContext } from "./provider";
import { ArrowRight, Sparkles, Code2, Zap, CheckCircle2 } from "lucide-react";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:bg-neutral-900/80 dark:border-neutral-800/80">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <h2 className="font-bold text-xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300">
                Wireframe2Code
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {!user?.email ? (
                <Link href="/auth">
                  <button className="px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-200 font-medium shadow-sm hover:shadow dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
                    Sign in
                  </button>
                </Link>
              ) : (
                <ProfileAvatar />
              )}
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[50%] top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-100 to-cyan-50 opacity-40 blur-3xl dark:from-blue-950 dark:to-cyan-950 dark:opacity-20"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 dark:bg-neutral-800 dark:text-slate-300">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>AI-Powered Development Tool</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-slate-900 dark:text-white">
                  Transform Wireframes
                </span>
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Into Production Code
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Accelerate your development workflow with AI. Convert design wireframes into clean, production-ready code in seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                {user?.email ? (
                  <Link href="/dashboard">
                    <button className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                ) : (
                  <Link href="/auth">
                    <button className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
                      Get Started Free
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <Image
                src="/Wireframetocode.png"
                alt="Wireframe to Code conversion example"
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-slate-50 dark:bg-neutral-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Why Choose Wireframe2Code?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Built for developers who value speed and quality
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group p-8 bg-white dark:bg-neutral-800 rounded-2xl border border-slate-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Lightning Fast
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Generate production-ready code from your wireframes in seconds, not hours.
                </p>
              </div>

              <div className="group p-8 bg-white dark:bg-neutral-800 rounded-2xl border border-slate-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-950 rounded-xl flex items-center justify-center mb-6">
                  <Code2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Clean Code
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  AI-generated code that follows best practices and is ready for production.
                </p>
              </div>

              <div className="group p-8 bg-white dark:bg-neutral-800 rounded-2xl border border-slate-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Easy to Use
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Simple interface that makes converting wireframes effortless and intuitive.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to accelerate your workflow?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Join developers who are building faster with AI-powered code generation.
            </p>
            {!user?.email && (
              <Link href="/auth">
                <button className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
                  Start Building Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-neutral-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-semibold text-slate-900 dark:text-white">
                Wireframe2Code
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Transform your designs into code with AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
