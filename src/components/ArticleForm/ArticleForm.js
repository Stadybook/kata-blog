import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import style from '../../pages/Forms.module.scss';
import Tags from '../Tags';

export default function ArticleForm({
    onSubmit,
    title,
    description,
    body,
    tagList,
    confirm,
    setTagList,
}) {
    ArticleForm.propTypes = {
        onSubmit: PropTypes.func.isRequired,
        confirm: PropTypes.func.isRequired,
        setTagList: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            title,
            description,
            body,
        },
    });

    return (
        <section className={`${style.container} ${style.lg}`}>
            <h5 className={style.title}>Create new article</h5>
            <form onSubmit={handleSubmit(onSubmit)} className={style.inputs}>
                <label htmlFor='title'>
                    <span>Title</span>
                    <input
                        type='text'
                        className={errors?.title ? style.danger : null}
                        {...register('title', {
                            required: 'This is required.',
                        })}
                        placeholder='Title'
                    />
                </label>
                <p>{errors?.title?.message}</p>
                <label htmlFor='description'>
                    <span> Short description</span>
                    <input
                        type='text'
                        className={errors?.title ? style.danger : null}
                        {...register('description', {
                            required: 'This is required.',
                        })}
                        placeholder='Short description'
                    />
                </label>
                <p>{errors?.description?.message}</p>
                <label htmlFor='body'>
                    <span> Text</span>
                    <textarea
                        type='text'
                        className={errors?.title ? style.danger : null}
                        {...register('body', {
                            required: 'This is required.',
                        })}
                        placeholder='Text'
                    />
                </label>
                <p>{errors?.text?.message}</p>
                <Tags
                    confirm={confirm}
                    tagList={tagList}
                    showTags={setTagList}
                />
                <input className={style.btn} type='submit' value='Send' />
            </form>
        </section>
    );
}
