
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs';
import Container from './container';


export default function HeaderPage() {
    return (
        <Container className='w-full'>
            <header className='flex justify-between items-center w-full py-4'>
                <p className='font-bold'>Invoicepedia</p>
                <div>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </header>
        </Container>
    )
}