import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Login form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      {/* Left side - Fun Branding */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-600 to-cyan-500 relative overflow-hidden">
        <div className="z-10 text-center md:space-y-12 max-w-md">
          {/* Animated Logo/Icon */}
          <div className="hidden md:flex justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
              <div className="w-8 h-8 border-2 border-white rounded-full relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>

          {/* Fun heading */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Welcome Back
              <br />
              <span className="text-cyan-200">Innovator!</span> 🚀
            </h1>
            <p className="text-md md:text-xl text-white/90 leading-relaxed">
              Ready to turn more ideas into reality? Let's get those creative
              wheels spinning! ⚡
            </p>
          </div>

          {/* Fun floating elements */}
          {/* <div className="space-y-4 text-white/80">
            <div className="flex items-center justify-center space-x-2 text-lg">
              <span>💡</span>
              <span>Ideas brewing...</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <span>🎯</span>
              <span>Innovation incoming!</span>
            </div>
          </div> */}
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-20 w-24 h-24 bg-cyan-300/20 rounded-full animate-float"></div>
        <div className="absolute bottom-32 left-16 w-16 h-16 bg-blue-300/20 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/3 left-20 w-8 h-8 bg-white/20 rounded-full animate-float delay-500"></div>
      </div>

      {/* Right side - Form */}
      <div className="md:w-1/2 flex items-center justify-center p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="text-gray-600">
              Welcome back to your innovation hub! 🎉
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-gray-700 font-medium"
              >
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-gray-700 font-medium"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-lg transform hover:scale-105 transition-all duration-200"
            >
              Sign In ✨
            </Button>
          </form>

          <div className="text-center space-y-3">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Create one 🎯
              </Link>
            </p>
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors inline-block"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
