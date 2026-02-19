import { useState } from "react";
import axiosInstance from "../lib/axiosInstance.js";
import Spinner from "../components/loaders/Spinner.jsx";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {

            setLoading(true)

            const response = await axiosInstance.post('/api/auth/sign-up', {
                name: name,
                email: email,
                password: password
            })

            localStorage.setItem('token', response.data.token)

            navigate('/')

        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full flex items-center justify-center px-2 md:px-0">

            {/* Login Card */}
            <div className="w-full max-w-md bg-glass-bg border border-glass-border rounded-2xl p-6 backdrop-blur-md">

                <h1 className="text-2xl font-semibold text-center mb-6">
                    Sign-up
                </h1>

                {/* Form */}
                <form onSubmit={handleSignUp} className="space-y-4">

                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-surface border border-border-soft focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-surface border border-border-soft focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-surface border border-border-soft focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 px-6 py-2 bg-button-primary rounded-lg disabled:opacity-70 w-full hover:bg-button-primary-hover transition-all duration-300"
                    >
                        {loading ? <> <Spinner /> Signing up</> : "Sign Up"}
                    </button>
                </form>

                {/* Extra Actions */}
                <div className="flex justify-between mt-4 text-sm text-text-secondary">
                    <button onClick={() => console.log("Forgot password clicked")}>
                        Forgot Password
                    </button>
                    <Link to='/login'>
                        Signup
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default SignUp;
