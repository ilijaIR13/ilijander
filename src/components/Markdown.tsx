
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  )
}
