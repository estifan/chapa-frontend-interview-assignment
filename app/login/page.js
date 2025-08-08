'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
     const {login} = useContext(AuthContext);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const storedUser = localStorage.getItem('user');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await login(email, password).catch((error) => {
            setError(error.message);
        })
        setLoading(false);
    }

    useEffect(() => {
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.role === 'user') {
                router.push('/dashboard/user');
            } else if (user.role === 'admin') {
                router.push('/dashboard/admin');
            } else if (user.role === 'superadmin') {
                router.push('/dashboard/superadmin');
            }
        }
    }, [router, storedUser]);

    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === 'user') {
            router.push('/dashboard/user');
        } else if (user.role === 'admin') {
            router.push('/dashboard/admin');
        } else if (user.role === 'superadmin') {
            router.push('/dashboard/superadmin');
        }
    }
    return (
        <div>
            <div className="flex flex-col w-screen gap-4 mx-auto h-screen items-center justify-center">
                <div className=" flex flex-col gap-4 max-w-[300px] w-full border border-gray-300 p-4 rounded shadow-lg">
                <Image className="self-center"  src="/logo.svg" alt="Logo" width={150} height={40} />
                <p className="text-2xl font-bold">Chapa Login</p>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary focuse:border-primary" type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary focuse:border-primary" type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className={` ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'} text-white rounded p-2 cursor-pointer`} type="submit">{loading ? 'Logging in...' : 'Login'}</button>
                    
                </form>
                </div>
            </div>
        </div>
    )
}