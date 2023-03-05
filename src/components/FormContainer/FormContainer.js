import style from './FormContainer.module.scss';

export default function FormContainer({ component, width }) {
    return (
        <section style={{ width: `${width}px` }} className={style.container}>
            {component}
        </section>
    );
}
