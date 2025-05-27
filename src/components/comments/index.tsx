import React, { useEffect, useRef } from 'react';

const Comments = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  const commentsRef = useRef<null | HTMLDivElement>(null);

  function createScriptEl() {
    let scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', 'https://utteranc.es/client.js');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    scriptEl.setAttribute('async', 'true');
    scriptEl.setAttribute('repo', 'himanshuc3/blog');
    scriptEl.setAttribute('issue-term', 'pathname');
    scriptEl.setAttribute('theme', isDarkTheme ? 'github-dark' : 'github-light');
    return scriptEl;
  }

  useEffect(() => {
    const scriptEl = createScriptEl();
    if (commentsRef.current?.children.length) {
      const prevScriptEl = commentsRef.current.children[0] as HTMLScriptElement;
      prevScriptEl.remove();
    }
    commentsRef.current?.appendChild(scriptEl);
  }, [isDarkTheme]);

  return (
    <div>
      <div ref={commentsRef} className="comment-box" />
      {/* Above element is where the comments are injected */}
    </div>
  );
};

export default Comments;
