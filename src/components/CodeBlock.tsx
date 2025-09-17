'use client'
import { Highlight, themes } from 'prism-react-renderer'
import CopyButton from './CopyButton'

export default function CodeBlock({
  code,
  language = 'cpp',
}: { code: string; language?: string }) {
  return (
    <div className="code-block relative">
      <div className="absolute right-3 top-2">
        <CopyButton text={code} />
      </div>
      <Highlight code={code.trim()} language={language as any} theme={themes.github}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
