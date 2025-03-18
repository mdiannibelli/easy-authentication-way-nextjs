'use client';
import { signup } from '@/actions/signup'
import { useActionState } from 'react';

const SignupForm = () => {
    const [state, formAction, pending] = useActionState(signup, undefined);
    return (
        <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className='text-sm font-medium'>Full name:</label>
                <input type="text" name="name" className="border-1 border-slate-200 rounded-md py-2 px-4 text-gray-700 select-none outline-none" />
                {state?.errors?.name && <p className='text-xs text-red-500'>{state.errors.name}</p>}
            </div>
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

            <div>
                <button
                    disabled={pending}
                    className="bg-black cursor-pointer text-white text-xl py-2 rounded-md px-8 w-full">
                    {pending ? 'Submitting...' : 'Sign up'}
                </button>
            </div>
        </form>
    )
}

export default SignupForm
