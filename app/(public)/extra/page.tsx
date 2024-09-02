"use client"
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const ExtraPage = () => {
    const { data: session, status } = useSession(
        {
            required: true,
            onUnauthenticated() {
                redirect("/api/auth/signin?callbackUrl=/extra")
            },
        }
    );

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'authenticated') {
        return (
            <>
                <p>Welcome, {session.user?.email}</p>
                {/* Access other user data if needed */}
            </>
        );
    }

    return <p>You are not signed in.</p>;
}

export default ExtraPage;
