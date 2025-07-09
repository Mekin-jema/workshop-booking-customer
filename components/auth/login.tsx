'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/lib/schema/loginSchema';
import { toast } from 'sonner';
import { useLoginMutation } from '@/Redux/features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/Redux/features/auth/authSlice';

type LoginFormValues = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

const Login: React.FC = () => {
    const [pending, setPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const [login, { data, error, isSuccess }] = useLoginMutation();

    useEffect(() => {
        if (error && 'data' in error) {
            const errorData = error as any;
            toast.error(errorData.data.error || 'Login failed. Please try again.');
        }
        if (isSuccess && data) {
            dispatch(setCredentials(data));
            toast.success('Login successful');
            router.push('/dashboard');
        }
    }, [isSuccess, error, data, dispatch, router]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (formData: LoginFormValues) => {
        try {
            setPending(true);
            await login({ email: formData.email, password: formData.password }).unwrap();
            reset();
        } catch (err) {
            console.error(err);
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
                    <p className="text-gray-600 mt-1">Enter your credentials to access your account</p>
                </div>

                <div className="px-6 pb-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div
                                className={`relative flex items-center rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <Mail className="h-5 w-5 text-gray-400 ml-3" />
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder="john.doe@example.com"
                                            className="w-full py-2 px-3 focus:outline-none"
                                        />
                                    )}
                                />
                            </div>
                            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div
                                className={`relative flex items-center rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <Lock className="h-5 w-5 text-gray-400 ml-3" />
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            className="w-full py-2 px-3 focus:outline-none"
                                        />
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="px-3 text-gray-400"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={pending}
                            className={`w-full flex justify-center items-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ${pending ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                        >
                            {pending ? (
                                <>
                                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Log in <ArrowRight className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </button>
                    </form>



                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
