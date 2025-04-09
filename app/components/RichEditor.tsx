'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
//dynamic
const QuillEditor = dynamic(() => import('react-quill-new'), { ssr: false });

type RichEditorProps = {
  name: string;
  value: string;
  onChange: (value: string, name: string) => void;
};
export default function RichEditor({ name, value, onChange }: RichEditorProps) {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    // 'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  const handleEditorChange = (newContent: string) => {
    onChange(newContent, name);
  };
  return (
    <div className='h-60'>
      <QuillEditor
        value={value}
        onChange={handleEditorChange}
        modules={quillModules}
        formats={quillFormats}
        className='h-48'
      />
    </div>
  );
}
