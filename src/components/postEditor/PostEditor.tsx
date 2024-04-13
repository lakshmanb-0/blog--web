import conf from '@/conf/conf'
import { Editor } from '@tinymce/tinymce-react'
import { Spin } from 'antd'
import { useState } from 'react'

const PostEditor = ({ editorValue }: { editorValue: any }) => {
    const [loading, setLoading] = useState(true)

    return (
        <>
            <section className={`${loading ? 'hidden' : ''} py-10`}>
                <Editor
                    onLoadContent={() => setLoading(false)}
                    apiKey={conf.TINYMCE_API_KEY}
                    onInit={(_, editor) => editorValue.current = editor}
                    initialValue="<p>hello</p>"
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright | bullist numlist | ' +
                            'removeformat  image',
                    }}
                />
            </section>
            {loading && <div className='w-full h-[40vh] grid place-items-center'><Spin /></div>}
        </>

    )
}

export default PostEditor