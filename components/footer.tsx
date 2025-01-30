import Link from 'next/link';
import Container from './container';

export default function FooterPage() {
    return (
        <footer >
            <Container className=' flex justify-between items-center py-4'>
                <p>Invoicepedia &copy; {new Date().getFullYear()}</p>
                <Link href="https://github.com/vijay-singh-coder">
                    <p>
                        Created by Vijay Singh
                    </p>
                </Link>
            </Container>
        </footer>
    );
}
