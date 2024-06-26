import conf from '@/conf/conf'
import { Editor } from '@tinymce/tinymce-react'
import { Spin } from 'antd'
import { useState } from 'react'
const PostEditor = ({ editorValue, initialValue }: { editorValue: any, initialValue: string }) => {
    const [loading, setLoading] = useState(true)

    return (
        <>
            <section className={`${loading ? 'hidden' : ''} py-10`}>
                <Editor
                    onLoadContent={() => setLoading(false)}
                    apiKey={conf.TINYMCE_API_KEY}
                    onInit={(_, editor) => editorValue.current = editor}
                    initialValue={initialValue}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'codesample', 'link', 'media',
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright | bullist numlist | ' +
                            'removeformat  image codesample | link | media ',
                        image_caption: true,
                        media_poster: false,
                        media_dimensions: false,
                        media_alt_source: false

                    }}
                />
            </section>
            {loading && <div className='w-full h-[40vh] grid place-items-center'><Spin /></div>}
        </>

    )
}

export default PostEditor