import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext";

import styles from '../styles/Home.module.css'
import { withSSRGuest } from "../utils/withSSRGuest";


export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signIn} = useContext(AuthContext)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault(); //previne que depois do submit do form a pag de reload

        const data = {
            email,
            password,
        }
        await signIn(data);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input  type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Entrar</button>
        </form>
    )

}

export const getServerSideProps = withSSRGuest(async (ctx) => { //caso o cliente ja tenho logado e os cookies estejam validos ja redireciona para frente
    // console.log(ctx.req.cookies);
     return {
        props: {

        }
    }
});