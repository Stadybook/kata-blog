/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import Tags from '../Tags';
import InputSubmit from '../InputSubmit';
import Message from '../Message';
import FormTitle from '../FormTitle';

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
        <>
            <FormTitle text='Create new article' />
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
                <label style={{ fontSize: 14 }} htmlFor='title'>
                    Title
                </label>
                <input
                    type='text'
                    style={errors?.title ? { borderColor: '#F5222D' } : null}
                    {...register('title', {
                        required: 'This is required.',
                    })}
                    placeholder='Title'
                />

                <Message message={errors?.title?.message} />
                <label style={{ fontSize: 14 }} htmlFor='description'>
                    Short description
                </label>
                <input
                    type='text'
                    style={
                        errors?.description ? { borderColor: '#F5222D' } : null
                    }
                    {...register('description', {
                        required: 'This is required.',
                    })}
                    placeholder='Short description'
                />

                <Message message={errors?.description?.message} />
                <label style={{ fontSize: 14 }} htmlFor='body'>
                    Text
                </label>
                <textarea
                    type='text'
                    style={errors?.body ? { borderColor: '#F5222D' } : null}
                    {...register('body', {
                        required: 'This is required.',
                    })}
                    placeholder='Text'
                />

                <Message message={errors?.body?.message} />
                <Tags
                    confirm={confirm}
                    tagList={tagList}
                    showTags={setTagList}
                />
                <InputSubmit value='Send' />
            </form>
        </>
    );
}
