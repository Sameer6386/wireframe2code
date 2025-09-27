"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../provider";
import { auth } from "@/configs/firebaseConfig";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const router = useRouter();
  const { user } = useAuthContext();
  const provider = new GoogleAuthProvider();

  // Redirect if already authenticated
  if (user) {
    router.replace("/dashboard");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        toast.success("Successfully signed in!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Google auth error:", error);
      switch (error.code) {
        case "auth/popup-blocked":
          toast.error("Please allow popups for this website");
          break;
        case "auth/cancelled-popup-request":
          break;
        default:
          toast.error("Failed to sign in with Google");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isLogin && !formData.name) {
      toast.error("Please enter your name");
      return;
    }

    try {
      setLoading(true);
      
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("Successfully signed in!");
      } else {
        const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        if (result.user && formData.name) {
          await updateProfile(result.user, {
            displayName: formData.name
          });
        }
        toast.success("Account created successfully!");
      }
      
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Email auth error:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email is already registered");
          break;
        case "auth/weak-password":
          toast.error("Password should be at least 6 characters");
          break;
        case "auth/invalid-email":
          toast.error("Please enter a valid email address");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          toast.error("Invalid email or password");
          break;
        default:
          toast.error(isLogin ? "Failed to sign in" : "Failed to create account");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="Wireframe2Code"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Wireframe2Code
              </h1>
              <p className="text-sm text-gray-500">AI-Powered Design to Code</p>
            </div>
          </Link>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <div className="flex items-center justify-center space-x-1 mb-4">
                <motion.div
                  className={`h-1 w-8 rounded-full transition-colors duration-300 ${
                    isLogin ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                  layoutId="authIndicator"
                />
                <motion.div
                  className={`h-1 w-8 rounded-full transition-colors duration-300 ${
                    !isLogin ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              </div>
              
              <CardTitle className="text-2xl font-bold text-center">
                {isLogin ? "Welcome back" : "Create account"}
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                {isLogin 
                  ? "Sign in to your account to continue" 
                  : "Join thousands of creators building amazing apps"
                }
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Google Sign In */}
              <Button
                onClick={handleGoogleAuth}
                disabled={loading}
                variant="outline"
                className="w-full h-12 border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Image
                      src="/google.png"
                      alt="Google"
                      width={20}
                      height={20}
                      className="mr-3"
                    />
                    Continue with Google
                  </>
                )}
              </Button>

              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">or</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          name="name"
                          type="text"
                          placeholder="Full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 h-12 border-2 focus:border-blue-400 transition-colors"
                          required={!isLogin}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-12 border-2 focus:border-blue-400 transition-colors"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12 border-2 focus:border-blue-400 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      {isLogin ? "Sign in" : "Create account"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Toggle Auth Mode */}
              <div className="text-center pt-4 border-t">
                <p className="text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setFormData({ name: "", email: "", password: "" });
                    }}
                    className="ml-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
          <p>
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}