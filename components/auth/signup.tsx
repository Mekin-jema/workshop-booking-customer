'use client';

import React, { useEffect, useState } from 'react';
import {
    Mail,
    Lock,
    User,
    ArrowRight,
    Loader2,
    Eye,
    EyeOff,
} from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/lib/schema/signupSchema';
import { toast } from 'sonner';
import { useRegisterMutation } from '@/Redux/features/auth/authApiSlice';

type SignUpFormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Signup: React.FC = () => {
    const [pending, setPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const [register, { error, isSuccess }] = useRegisterMutation();

    useEffect(() => {
        if (error && 'data' in error) {
            const errorData = error as any;
            toast.error(errorData.data.error || 'Signup failed. Please try again.');
        }

        if (isSuccess) {
            toast.success('User Registered Successfully');
            router.push('/login');
        }
    }, [isSuccess, error, router]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: SignUpFormValues) => {
        const { confirmPassword, ...userData } = data;

        try {
            setPending(true);
            await register(userData).unwrap();
            reset();
        } catch (err: any) {
            toast.error(err?.data?.message || 'Signup failed. Try again.');
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
                    <p className="text-gray-600 mt-1">Enter your information to get started</p>
                </div>

                <div className="px-6 pb-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full name
                            </label>
                            <div className={`relative flex items-center rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}>
                                <User className="h-5 w-5 text-gray-400 ml-3" />
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <input {...field} id="name" type="text" placeholder="John Doe" className="w-full py-2 px-3 focus:outline-none" />
                                    )}
                                />
                            </div>
                            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className={`relative flex items-center rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}>
                                <Mail className="h-5 w-5 text-gray-400 ml-3" />
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <input {...field} id="email" type="email" placeholder="john@example.com" className="w-full py-2 px-3 focus:outline-none" />
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
                            <div className={`relative flex items-center rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}>
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
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="px-3 text-gray-400">
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className={`relative flex items-center rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}>
                                <Lock className="h-5 w-5 text-gray-400 ml-3" />
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            id="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            className="w-full py-2 px-3 focus:outline-none"
                                        />
                                    )}
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="px-3 text-gray-400">
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={pending}
                            className={`w-full flex justify-center items-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${pending ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                        >
                            {pending ? (
                                <>
                                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                    Please wait...
                                </>
                            ) : (
                                <>
                                    Sign up <ArrowRight className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </button>
                    </form>


                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-600">Already have an account? </span>
                        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
