'use client';

import { login } from "@/actions/login";
import { useActionState } from "react";

export const LoginForm = () => {
    const [state, formAction, pending] = useActionState(login, undefined);
    return (
        <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className='text-sm font-medium'>Email:</label>
                <input type="email" name="email" className="border-1 border-slate-200 rounded-md py-2 px-4 text-gray-700 select-none outline-none" />
                {state?.errors?.email && <p className='text-xs text-red-500'>{state.errors.email}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className='text-sm font-medium'>Password:</label>
                <input type="password" name="password" className="border-1 border-slate-200 rounded-md py-2 px-4 text-gray-700 select-none outline-none" />
                {state?.errors?.password && (
                    <div className="text-sm text-red-500">
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <p className="text-red-500 text-xs">{state?.message}</p>
            <div>
                <button
                    disabled={pending}
                    className="bg-black cursor-pointer text-white text-xl py-2 rounded-md px-8 w-full">
                    {pending ? 'Submitting...' : 'Login'}
                </button>
            </div>
            <a
                className=" text-black text-sm text-end rounded-md w-full"
                href="/auth/siginup">{`Don't have an account? Sign up!`}</a>
        </form>
    )
}
